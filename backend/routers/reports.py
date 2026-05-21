from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Header, Query
from fastapi.responses import StreamingResponse, RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional, Dict, Any
import io, uuid
from datetime import datetime
import pandas as pd
from services.clerk_auth import verify_token, get_user_id
from services.db import get_db
from services.report_generator import generate_pdf
from services.r2_storage import upload_pdf, download_pdf, get_presigned_url

router = APIRouter(prefix="/api/reports", tags=["reports"])

DEFAULT_COMPANY = "8479cb95-2057-490d-813c-825e83d71890"


# ── Auth helpers ───────────────────────────────────────────────────────────────

async def _verify_token(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")
        return verify_token(token)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


async def _get_user(token_data: Dict[str, Any] = Depends(_verify_token)) -> str:
    return get_user_id(token_data)


# ── Report metadata stored in Neon ────────────────────────────────────────────

def _save_report_meta(db: Session, user_id: str, filename: str, r2_key: str, file_size: int) -> int:
    row = db.execute(
        text("""
            INSERT INTO sustainability_reports (title, file_url, created_by, status, report_type)
            VALUES (:title, :file_url, :created_by, 'published', 'generated')
            RETURNING id
        """),
        {"title": filename, "file_url": r2_key, "created_by": user_id},
    ).mappings().first()
    db.commit()
    return str(row["id"])


def _get_report_meta(db: Session, report_id: str, user_id: str):
    return db.execute(
        text("SELECT title, file_url FROM sustainability_reports WHERE id = :id AND created_by = :uid"),
        {"id": report_id, "uid": user_id},
    ).mappings().first()


def _list_reports(db: Session, user_id: str):
    rows = db.execute(
        text("SELECT id, title, file_url, created_at FROM sustainability_reports WHERE created_by = :uid ORDER BY created_at DESC"),
        {"uid": user_id},
    ).mappings().all()
    return [{"id": str(r["id"]), "filename": r["title"], "created_at": str(r["created_at"]), "r2_key": r["file_url"]} for r in rows]


# ── Endpoints ──────────────────────────────────────────────────────────────────

@router.get("")
async def list_reports(user_id: str = Depends(_get_user), db: Session = Depends(get_db)):
    return {"reports": _list_reports(db, user_id)}


@router.get("/{report_id}/url")
async def get_report_url(report_id: str, user_id: str = Depends(_get_user), db: Session = Depends(get_db)):
    meta = _get_report_meta(db, report_id, user_id)
    if not meta:
        raise HTTPException(status_code=404, detail="Report not found")
    url = get_presigned_url(meta["file_url"])
    return {"url": url, "filename": meta["title"]}


@router.get("/{report_id}")
async def download_report(report_id: str, user_id: str = Depends(_get_user), db: Session = Depends(get_db)):
    meta = _get_report_meta(db, report_id, user_id)
    if not meta:
        raise HTTPException(status_code=404, detail="Report not found")
    pdf_bytes = download_pdf(meta["file_url"])
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={meta['title']}"},
    )


@router.post("/generate")
async def generate_report(
    user_id: str = Depends(_get_user),
    company_id: str = Query(DEFAULT_COMPANY),
    report_type: str = Query("full", pattern="^(full|monthly|annual|custom)$"),
    period: str = Query(""),
    db: Session = Depends(get_db),
):
    try:
        pdf_bytes, filename = generate_pdf(company_id, db, report_type, period)
        r2_key = f"reports/{user_id}/{uuid.uuid4()}_{filename}"
        upload_pdf(pdf_bytes, r2_key)
        _save_report_meta(db, user_id, filename, r2_key, len(pdf_bytes))
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {e}")


@router.post("/upload-file")
async def upload_esg_file(file: UploadFile = File(...)):
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Only .xlsx and .xls files supported")
    try:
        contents = await file.read()
        xls = pd.ExcelFile(io.BytesIO(contents))
        df = pd.read_excel(xls, "ESG Metrics")
        return {"columns": list(df.columns), "rows": len(df), "preview": df.head(5).to_dict(orient="records"), "message": "File parsed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {e}")
