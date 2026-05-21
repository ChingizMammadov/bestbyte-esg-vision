"""
Legacy endpoints — kept for backwards compatibility with the frontend.
These are the original /uploadfile/ and /report endpoints from the old main.py.
"""
import os, io, math, json
from datetime import datetime
from typing import Optional, Dict, Any

import pandas as pd
from fastapi import APIRouter, UploadFile, File, HTTPException, Header, Depends
from fastapi.responses import StreamingResponse, JSONResponse

from database import save_report, get_report
from utils import create_line_chart, create_pie_chart, create_bar_chart
from services.clerk_auth import verify_token, get_user_id

legacy_router = APIRouter(tags=["legacy"])


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


def _pct_change(df, col):
    df = df.copy()
    df["percentage_change"] = df[col].pct_change() * 100
    df["percentage_change"] = df["percentage_change"].fillna(0)
    return df[["Year", "percentage_change"]].to_dict(orient="records")


@legacy_router.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith((".xlsx", ".xls")):
        return JSONResponse(status_code=400, content={"message": "Invalid file type. Please upload an Excel file."})
    try:
        contents = await file.read()
        xls = pd.ExcelFile(io.BytesIO(contents))
        df = pd.read_excel(xls, "ESG Metrics")
        results = {}
        results["water_usage_change"] = _pct_change(df, "Water Usage (m3)")
        results["water_usage"] = df[["Year", "Water Usage (m3)"]].to_dict(orient="records")
        results["employee_safety_change"] = _pct_change(df, "Employee Safety (accidents)")
        results["waste_recycled_change"] = _pct_change(df, "Waste Recycled (tons)")
        results["waste_unrecycled_change"] = _pct_change(df, "Waste Unrecycled (tons)")
        waste_data = df[["Year", "Waste Recycled (tons)", "Waste Unrecycled (tons)"]].to_dict(orient="records")
        results["waste_recycled"] = waste_data
        latest_waste = waste_data[-1]
        results["waste_recycled_latest"] = [
            {"name": "Recycled", "value": latest_waste["Waste Recycled (tons)"], "color": "#10B981"},
            {"name": "Unrecycled", "value": latest_waste["Waste Unrecycled (tons)"], "color": "#F59E0B"},
        ]
        results["carbon_emissions_change"] = _pct_change(df, "Carbon Emissions (tons CO2e)")
        results["carbon_emissions"] = df[["Year", "Carbon Emissions Renewable (%)", "Carbon Emissions Non-Renewable (%)"]].to_dict(orient="records")
        energy_data = df[["Year", "Energy Renewable (%)", "Energy Non-Renewable (%)"]].to_dict(orient="records")
        results["energy_usage"] = energy_data
        latest_energy = energy_data[-1]
        results["energy_usage_latest"] = [
            {"name": "Renewable", "value": latest_energy["Energy Renewable (%)"], "color": "#10B981"},
            {"name": "Non-Renewable", "value": latest_energy["Energy Non-Renewable (%)"], "color": "#EF4444"},
        ]
        results["safety_data"] = [
            {"type": "Fatal", "count": int(df["Accident Fatal"].sum()), "color": "#EF4444"},
            {"type": "Serious", "count": int(df["Accident Serious"].sum()), "color": "#F59E0B"},
            {"type": "Minor", "count": int(df["Accident Minor"].sum()), "color": "#10B981"},
        ]
        results["diversity_data"] = [
            {
                "category": "Board",
                "men": df["Board members (male) as % of total"].tail(1).values[0],
                "women": df["Board members (female) as % of total"].tail(1).values[0],
                "minority": df["Board members (minority) as % of total"].tail(1).values[0],
            },
            {
                "category": "Management",
                "men": df["Employees in all management positions (male) % annual"].tail(1).values[0],
                "women": df["Employees in all management positions (female) % annual"].tail(1).values[0],
                "minority": df["Employees in all management positions (minority) % annual"].tail(1).values[0],
            },
        ]
        results["wellness_data"] = df[["Year", "Employees covered by collective bargaining Persons annual"]].to_dict(orient="records")
        results["gender_diversity_board"] = [
            {"name": "Female", "value": df["Board members (female) as % of total"].tail(1).values[0], "color": "#EC4899"},
            {"name": "Male", "value": df["Board members (male) as % of total"].tail(1).values[0], "color": "#3B82F6"},
            {"name": "Minority", "value": df["Board members (minority) as % of total"].tail(1).values[0], "color": "#f6f03bff"},
        ]
        results["anti_corruption_training"] = math.floor(
            100 * (df["Employees Trained (Anti-Corruption)"].tail(1).values[0] / df["Total number of employees"].tail(1).values[0])
        )
        return results
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error processing file: {e}"})


@legacy_router.post("/report")
async def generate_esg_report(
    excel_file: UploadFile = File(...),
    user_id: str = Depends(_get_user),
):
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(
            status_code=501,
            detail="AI report generation requires GEMINI_API_KEY. Set it in backend/.env to enable.",
        )

    try:
        from google import genai
        from reportlab.lib.pagesizes import letter
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
        from reportlab.lib.enums import TA_CENTER
        from reportlab.platypus.flowables import PageBreak

        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        file_contents = await excel_file.read()
        xls = pd.ExcelFile(io.BytesIO(file_contents))
        df = pd.read_excel(xls, "ESG Metrics")
        df_json = df.to_json(orient="records")
        report_text = os.getenv("REPORT_TEXT", "")

        sections = {
            "Executive Summary": "Write a compelling executive summary focusing on sustainability strategy and key highlights.",
            "Environmental": "Summarize environmental strategy, GHG emissions, energy use, and targets.",
            "Social": "Write about workforce wellbeing, DEI, and community engagement.",
            "Governance": "Detail governance structure, risk management, and ethics policies.",
            "Performance Metrics": "Present key ESG performance metrics and targets from the data.",
        }

        report_sections = {}
        for title, prompt in sections.items():
            full_prompt = (
                f"Based on this ESG data, write the '{title}' section of a corporate ESG report.\n\n"
                f"Source text:\n{report_text}\n\nData:\n{df_json}\n\nInstructions:\n{prompt}"
            )
            response = client.models.generate_content(model="gemini-2.5-flash", contents=full_prompt)
            report_sections[title] = response.text

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        flowables = [
            Paragraph("ESG Report", ParagraphStyle("T", parent=styles["Heading1"], alignment=TA_CENTER)),
            Spacer(1, 48),
            PageBreak(),
        ]
        for title, content in report_sections.items():
            flowables.append(Paragraph(title, styles["Heading2"]))
            flowables.append(Spacer(1, 6))
            for para in content.split("\n"):
                if para.strip():
                    flowables.append(Paragraph(para.strip(), styles["Normal"]))
                    flowables.append(Spacer(1, 6))
            flowables.append(Spacer(1, 18))

        doc.build(flowables)
        buffer.seek(0)
        pdf_data = buffer.getvalue()
        filename = f"ESG_Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        report_id = save_report(pdf_data, filename, user_id)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "X-Report-ID": str(report_id),
            },
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
