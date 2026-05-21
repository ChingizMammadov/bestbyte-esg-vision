"""ESG Report Generator — builds a structured PDF from Neon PostgreSQL data."""
from io import BytesIO
from datetime import datetime

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.platypus.flowables import PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from sqlalchemy.orm import Session
from sqlalchemy import text

from services.esg_analytics import compute_esg_score, compute_analytics_summary

EMERALD = HexColor("#10B981")
EMERALD_DARK = HexColor("#065F46")
SLATE = HexColor("#1E293B")
SLATE_LIGHT = HexColor("#64748B")
LIGHT_GRAY = HexColor("#F1F5F9")
MID_GRAY = HexColor("#E2E8F0")
RED = HexColor("#EF4444")
AMBER = HexColor("#F59E0B")


def _styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Heading1"], fontSize=28, textColor=white, alignment=TA_CENTER, spaceAfter=6),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontSize=12, textColor=HexColor("#A7F3D0"), alignment=TA_CENTER, spaceAfter=4),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontSize=16, textColor=EMERALD_DARK, spaceBefore=12, spaceAfter=6),
        "h3": ParagraphStyle("h3", parent=base["Heading3"], fontSize=12, textColor=SLATE, spaceBefore=8, spaceAfter=4),
        "body": ParagraphStyle("body", parent=base["Normal"], fontSize=10, textColor=SLATE, spaceAfter=4, leading=14),
        "small": ParagraphStyle("small", parent=base["Normal"], fontSize=8, textColor=SLATE_LIGHT, spaceAfter=2),
        "metric_label": ParagraphStyle("metric_label", parent=base["Normal"], fontSize=9, textColor=SLATE_LIGHT, alignment=TA_CENTER),
        "metric_value": ParagraphStyle("metric_value", parent=base["Heading2"], fontSize=18, textColor=EMERALD_DARK, alignment=TA_CENTER, spaceAfter=0),
    }


def _metric_table(rows: list[list]) -> Table:
    col_w = (letter[0] - 2 * inch) / max(len(rows[0]), 1)
    t = Table(rows, colWidths=[col_w] * len(rows[0]), rowHeights=None)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GRAY),
        ("BOX", (0, 0), (-1, -1), 0.5, MID_GRAY),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, MID_GRAY),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("ROUNDEDCORNERS", [4]),
    ]))
    return t


def _data_table(headers: list, rows: list[list], zebra=True) -> Table:
    col_count = len(headers)
    col_w = (letter[0] - 2 * inch) / col_count
    data = [headers] + rows
    t = Table(data, colWidths=[col_w] * col_count)
    styles = [
        ("BACKGROUND", (0, 0), (-1, 0), EMERALD_DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("BOX", (0, 0), (-1, -1), 0.5, MID_GRAY),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, MID_GRAY),
    ]
    if zebra:
        for i in range(1, len(data)):
            bg = LIGHT_GRAY if i % 2 == 0 else white
            styles.append(("BACKGROUND", (0, i), (-1, i), bg))
    t.setStyle(TableStyle(styles))
    return t


def generate_pdf(company_id: str, db: Session, report_type: str = "full", period: str = "") -> tuple[bytes, str]:
    """Generate an ESG report PDF. Returns (pdf_bytes, filename)."""
    s = _styles()
    now = datetime.now()
    filename = f"ESG_Report_{report_type}_{now.strftime('%Y%m%d_%H%M%S')}.pdf"

    summary = compute_analytics_summary(company_id, db)
    score = summary.esg_score

    def q(sql, params=None):
        return db.execute(text(sql), params or {"cid": company_id}).mappings().all()

    carbon_q = q("SELECT scope, emissions_co2_tons, reporting_period FROM carbon_footprint_details WHERE company_id = :cid ORDER BY reporting_period DESC LIMIT 50")
    energy_q = q("SELECT energy_type, consumption_kwh, reporting_period FROM energy_consumption WHERE company_id = :cid ORDER BY reporting_period DESC LIMIT 50")
    waste_q = q("SELECT disposal_method, amount_kg, reporting_period FROM waste_management_data WHERE company_id = :cid ORDER BY reporting_period DESC LIMIT 50")
    water_q = q("SELECT consumption_liters, reporting_period FROM water_usage_details WHERE company_id = :cid ORDER BY reporting_period DESC LIMIT 24")
    employees_q = q("SELECT metric_name, value, unit, target_value FROM employee_engagement WHERE company_id = :cid")
    targets_q = q("SELECT metric_name AS name, category, current_value, target_value, target_date, unit FROM esg_targets WHERE company_id = :cid AND is_active = true ORDER BY target_date")
    suppliers_q = q("SELECT supplier_name, esg_score, supplier_category AS category FROM supply_chain_metrics WHERE company_id = :cid ORDER BY esg_score DESC LIMIT 10")

    # ── Build PDF ───────────────────────────────────────────────────────────────
    buf = BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=letter,
        leftMargin=inch,
        rightMargin=inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )
    story = []

    # ── Cover Page ──────────────────────────────────────────────────────────────
    cover_data = [[
        Paragraph("ESG Intelligence Report", s["title"]),
    ]]
    cover = Table(cover_data, colWidths=[letter[0] - 2 * inch])
    cover.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), EMERALD_DARK),
        ("TOPPADDING", (0, 0), (-1, -1), 40),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 40),
        ("LEFTPADDING", (0, 0), (-1, -1), 20),
        ("RIGHTPADDING", (0, 0), (-1, -1), 20),
    ]))
    story.append(cover)
    story.append(Spacer(1, 0.2 * inch))

    meta_rows = [[
        Paragraph(f"Report Type: {report_type.title()}", s["body"]),
        Paragraph(f"Generated: {now.strftime('%B %d, %Y')}", s["body"]),
        Paragraph(f"Period: {period or 'All time'}", s["body"]),
    ]]
    story.append(_metric_table(meta_rows))
    story.append(Spacer(1, 0.3 * inch))

    # ── ESG Score Banner ────────────────────────────────────────────────────────
    story.append(Paragraph("Overall ESG Performance", s["h2"]))
    score_rows = [[
        Paragraph(f"{score.grade}", s["metric_value"]),
        Paragraph(f"{score.overall:.1f}", s["metric_value"]),
        Paragraph(f"{score.environmental:.1f}", s["metric_value"]),
        Paragraph(f"{score.social:.1f}", s["metric_value"]),
        Paragraph(f"{score.governance:.1f}", s["metric_value"]),
    ], [
        Paragraph("Grade", s["metric_label"]),
        Paragraph("Overall Score", s["metric_label"]),
        Paragraph("Environmental", s["metric_label"]),
        Paragraph("Social", s["metric_label"]),
        Paragraph("Governance", s["metric_label"]),
    ]]
    story.append(_metric_table(score_rows))
    story.append(Spacer(1, 0.2 * inch))

    # ── Key KPIs ────────────────────────────────────────────────────────────────
    kpi_rows = [[
        Paragraph(f"{summary.total_carbon_tco2e:,.1f}", s["metric_value"]),
        Paragraph(f"{summary.renewable_energy_pct:.1f}%", s["metric_value"]),
        Paragraph(f"{summary.recycling_rate_pct:.1f}%", s["metric_value"]),
        Paragraph(f"{summary.water_usage_ml:,.2f}", s["metric_value"]),
    ], [
        Paragraph("Total Carbon (tCO₂e)", s["metric_label"]),
        Paragraph("Renewable Energy", s["metric_label"]),
        Paragraph("Waste Recycled", s["metric_label"]),
        Paragraph("Water Usage (ML)", s["metric_label"]),
    ]]
    story.append(_metric_table(kpi_rows))
    story.append(PageBreak())

    # ── Environmental Section ───────────────────────────────────────────────────
    story.append(Paragraph("Environmental Performance", s["h2"]))
    story.append(HRFlowable(width="100%", thickness=1, color=EMERALD, spaceAfter=8))

    # Carbon by scope
    story.append(Paragraph("Carbon Emissions by Scope", s["h3"]))
    scope_totals: dict[int, float] = {}
    for r in carbon_q:
        sc = r["scope"] or 1
        scope_totals[sc] = scope_totals.get(sc, 0) + (r["emissions_co2_tons"] or 0)
    carbon_headers = ["Scope", "Total Emissions (tCO₂e)", "% of Total"]
    total_c = sum(scope_totals.values()) or 1
    carbon_rows_data = [
        [f"Scope {sc}", f"{v:,.2f}", f"{v/total_c*100:.1f}%"]
        for sc, v in sorted(scope_totals.items())
    ]
    if carbon_rows_data:
        story.append(_data_table(carbon_headers, carbon_rows_data))
    story.append(Spacer(1, 0.15 * inch))

    # Energy mix
    story.append(Paragraph("Energy Consumption", s["h3"]))
    etype_totals: dict[str, float] = {}
    for r in energy_q:
        et = r["energy_type"] or "other"
        etype_totals[et] = etype_totals.get(et, 0) + (r["consumption_kwh"] or 0)
    total_e = sum(etype_totals.values()) or 1
    energy_headers = ["Energy Type", "Consumption (kWh)", "% of Mix"]
    energy_rows_data = [
        [et.title(), f"{v:,.0f}", f"{v/total_e*100:.1f}%"]
        for et, v in sorted(etype_totals.items(), key=lambda x: -x[1])
    ]
    if energy_rows_data:
        story.append(_data_table(energy_headers, energy_rows_data))
    story.append(Spacer(1, 0.15 * inch))

    # Waste
    story.append(Paragraph("Waste Management", s["h3"]))
    wtype_totals: dict[str, float] = {}
    for r in waste_q:
        dm = r["disposal_method"] or "other"
        wtype_totals[dm] = wtype_totals.get(dm, 0) + (r["amount_kg"] or 0)
    total_w = sum(wtype_totals.values()) or 1
    waste_headers = ["Disposal Method", "Amount (kg)", "% of Total"]
    waste_rows_data = [
        [dm.title(), f"{v:,.0f}", f"{v/total_w*100:.1f}%"]
        for dm, v in sorted(wtype_totals.items(), key=lambda x: -x[1])
    ]
    if waste_rows_data:
        story.append(_data_table(waste_headers, waste_rows_data))
    story.append(Spacer(1, 0.15 * inch))

    # Water
    story.append(Paragraph("Water Usage", s["h3"]))
    total_water_l = sum(r["consumption_liters"] or 0 for r in water_q)
    water_info = [[
        Paragraph(f"{total_water_l/1_000_000:,.2f} ML", s["metric_value"]),
        Paragraph(f"{total_water_l/1_000:,.0f} m³", s["metric_value"]),
    ], [
        Paragraph("Total Volume (Megalitres)", s["metric_label"]),
        Paragraph("Total Volume (m³)", s["metric_label"]),
    ]]
    story.append(_metric_table(water_info))
    story.append(PageBreak())

    # ── Social Section ──────────────────────────────────────────────────────────
    story.append(Paragraph("Social Performance", s["h2"]))
    story.append(HRFlowable(width="100%", thickness=1, color=EMERALD, spaceAfter=8))
    story.append(Paragraph("Employee Engagement Metrics", s["h3"]))

    emp_headers = ["Metric", "Current Value", "Target", "Unit"]
    emp_rows_data = [
        [
            r["metric_name"],
            f"{r['value']:,.1f}" if r["value"] is not None else "—",
            f"{r['target_value']:,.1f}" if r["target_value"] else "—",
            r["unit"] or "—",
        ]
        for r in employees_q
    ]
    if emp_rows_data:
        story.append(_data_table(emp_headers, emp_rows_data))
    story.append(Spacer(1, 0.2 * inch))

    # Suppliers
    story.append(Paragraph("Supply Chain ESG Performance", s["h3"]))
    sup_headers = ["Supplier", "ESG Score", "Risk Level", "Category"]
    sup_rows_data = [
        [
            r["supplier_name"] or "—",
            f"{r['esg_score']}/100" if r["esg_score"] is not None else "—",
            (r["risk_level"] or "—").title(),
            (r["category"] or "—").title(),
        ]
        for r in suppliers_q
    ]
    if sup_rows_data:
        story.append(_data_table(sup_headers, sup_rows_data))
    story.append(PageBreak())

    # ── Governance Section ──────────────────────────────────────────────────────
    story.append(Paragraph("Governance & Targets", s["h2"]))
    story.append(HRFlowable(width="100%", thickness=1, color=EMERALD, spaceAfter=8))

    targets_on = summary.targets_on_track
    targets_total = summary.targets_total
    gov_banner = [[
        Paragraph(f"{targets_on} / {targets_total}", s["metric_value"]),
        Paragraph(f"{targets_on/targets_total*100:.0f}%" if targets_total else "—", s["metric_value"]),
        Paragraph(f"{score.governance:.1f}", s["metric_value"]),
    ], [
        Paragraph("Targets On Track", s["metric_label"]),
        Paragraph("Completion Rate", s["metric_label"]),
        Paragraph("Governance Score", s["metric_label"]),
    ]]
    story.append(_metric_table(gov_banner))
    story.append(Spacer(1, 0.2 * inch))

    story.append(Paragraph("Active ESG Targets", s["h3"]))
    tgt_headers = ["Target", "Category", "Progress", "Due Date"]
    tgt_rows_data = []
    for t in targets_q:
        cv = t["current_value"] or 0
        tv = t["target_value"] or 1
        pct = min(100, cv / tv * 100) if tv > 0 else 0
        tgt_rows_data.append([
            t["name"] or "—",
            (t["category"] or "—").title(),
            f"{pct:.0f}% ({cv:.1f} / {tv:.1f} {t['unit'] or ''})",
            t["target_date"] or "—",
        ])
    if tgt_rows_data:
        story.append(_data_table(tgt_headers, tgt_rows_data))
    story.append(Spacer(1, 0.3 * inch))

    # ── Footer note ─────────────────────────────────────────────────────────────
    story.append(HRFlowable(width="100%", thickness=0.5, color=MID_GRAY, spaceAfter=6))
    story.append(Paragraph(
        f"Generated by BestByte ESG Vision on {now.strftime('%B %d, %Y at %H:%M')}. "
        "Data sourced from live Supabase database. For internal use only.",
        s["small"],
    ))

    doc.build(story)
    buf.seek(0)
    return buf.getvalue(), filename
