from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime
from services.db import get_db

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health_check(db: Session = Depends(get_db)):
    db_ok = True
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_ok = False

    return {
        "status": "ok" if db_ok else "degraded",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "neon_connected" if db_ok else "unreachable",
        "version": "1.0.0",
    }
