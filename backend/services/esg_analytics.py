"""ESG Analytics Engine — computes ESG scores, KPI trends, and benchmarks from Neon PostgreSQL."""

from typing import List
from decimal import Decimal
from sqlalchemy.orm import Session
from sqlalchemy import text
from models.schemas import ESGScore, TrendPoint, AnalyticsSummary


def _f(v) -> float:
    """Convert Decimal or None to float safely."""
    if v is None:
        return 0.0
    return float(v)

COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890"


def _grade(score: float) -> str:
    if score >= 90: return "A+"
    if score >= 80: return "A"
    if score >= 70: return "B+"
    if score >= 60: return "B"
    if score >= 50: return "C"
    return "D"


def compute_environmental_score(company_id: str, db: Session) -> float:
    energy = db.execute(
        text("SELECT energy_type, consumption_kwh FROM energy_consumption WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_kwh = sum(_f(r["consumption_kwh"]) for r in energy)
    renewable_kwh = sum(_f(r["consumption_kwh"]) for r in energy if r["energy_type"] == "renewable")
    renewable_pct = (renewable_kwh / total_kwh * 100) if total_kwh > 0 else 0

    waste = db.execute(
        text("SELECT amount_kg, disposal_method FROM waste_management_data WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_waste = sum(_f(r["amount_kg"]) for r in waste)
    recycled = sum(_f(r["amount_kg"]) for r in waste if r["disposal_method"] == "recycled")
    recycling_rate = (recycled / total_waste * 100) if total_waste > 0 else 0

    env_targets = db.execute(
        text("SELECT current_value, target_value FROM esg_targets WHERE company_id = :cid AND category = 'environmental' AND is_active = true"),
        {"cid": company_id}
    ).mappings().all()
    target_progress = [
        min(100, _f(t["current_value"]) / _f(t["target_value"]) * 100)
        for t in env_targets if t["target_value"] and _f(t["target_value"]) > 0
    ]
    avg_target_progress = sum(target_progress) / len(target_progress) if target_progress else 50

    return round(min(100, (renewable_pct * 0.4) + (recycling_rate * 0.3) + (avg_target_progress * 0.3)), 1)


def compute_social_score(company_id: str, db: Session) -> float:
    engagement = db.execute(
        text("SELECT metric_name, value, target_value FROM employee_engagement WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    rows = {r["metric_name"]: r for r in engagement}

    satisfaction_raw = _f(rows.get("Employee Satisfaction Score", {}).get("value", 0))
    satisfaction_max = _f(rows.get("Employee Satisfaction Score", {}).get("target_value", 5)) or 5
    satisfaction_score = (satisfaction_raw / satisfaction_max * 100) if satisfaction_max else 0

    diversity_raw = _f(rows.get("Female Representation", {}).get("value", 0))
    diversity_score = min(100, diversity_raw * 2)

    safety_incidents = _f(rows.get("Safety Incidents", {}).get("value", 0))
    safety_score = max(0, 100 - (safety_incidents * 10))

    return round(min(100, (satisfaction_score * 0.35) + (diversity_score * 0.30) + (safety_score * 0.35)), 1)


def compute_governance_score(company_id: str, db: Session) -> float:
    targets = db.execute(
        text("SELECT current_value, target_value FROM esg_targets WHERE company_id = :cid AND category = 'governance' AND is_active = true"),
        {"cid": company_id}
    ).mappings().all()

    if not targets:
        return 75.0

    progress = [
        min(100, _f(t["current_value"]) / _f(t["target_value"]) * 100)
        for t in targets if t["target_value"] and _f(t["target_value"]) > 0
    ]
    return round(sum(progress) / len(progress) if progress else 75.0, 1)


def compute_esg_score(company_id: str, db: Session) -> ESGScore:
    e = compute_environmental_score(company_id, db)
    s = compute_social_score(company_id, db)
    g = compute_governance_score(company_id, db)
    overall = round((e * 0.4) + (s * 0.3) + (g * 0.3), 1)
    return ESGScore(environmental=e, social=s, governance=g, overall=overall, grade=_grade(overall))


def compute_carbon_trend(company_id: str, db: Session, months: int = 12) -> List[TrendPoint]:
    carbon = db.execute(
        text("SELECT emissions_co2_tons, reporting_period FROM carbon_footprint_details WHERE company_id = :cid ORDER BY reporting_period ASC"),
        {"cid": company_id}
    ).mappings().all()

    period_totals: dict[str, float] = {}
    for r in carbon:
        p = str(r["reporting_period"])
        period_totals[p] = period_totals.get(p, 0) + _f(r["emissions_co2_tons"])

    sorted_periods = sorted(period_totals.keys())[-months:]
    return [TrendPoint(period=p, value=round(period_totals[p], 2)) for p in sorted_periods]


def compute_analytics_summary(company_id: str, db: Session) -> AnalyticsSummary:
    carbon = db.execute(
        text("SELECT emissions_co2_tons FROM carbon_footprint_details WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_carbon = sum(_f(r["emissions_co2_tons"]) for r in carbon)

    energy = db.execute(
        text("SELECT energy_type, consumption_kwh FROM energy_consumption WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_kwh = sum(_f(r["consumption_kwh"]) for r in energy)
    renewable_kwh = sum(_f(r["consumption_kwh"]) for r in energy if r["energy_type"] == "renewable")
    renewable_pct = (renewable_kwh / total_kwh * 100) if total_kwh > 0 else 0

    waste = db.execute(
        text("SELECT amount_kg, disposal_method FROM waste_management_data WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_waste = sum(_f(r["amount_kg"]) for r in waste)
    recycled = sum(_f(r["amount_kg"]) for r in waste if r["disposal_method"] == "recycled")
    recycling_rate = (recycled / total_waste * 100) if total_waste > 0 else 0

    water = db.execute(
        text("SELECT consumption_liters FROM water_usage_details WHERE company_id = :cid"),
        {"cid": company_id}
    ).mappings().all()
    total_water_ml = sum(_f(r["consumption_liters"]) for r in water) / 1_000_000

    targets = db.execute(
        text("SELECT current_value, target_value FROM esg_targets WHERE company_id = :cid AND is_active = true"),
        {"cid": company_id}
    ).mappings().all()
    on_track = sum(
        1 for t in targets
        if t["target_value"] and _f(t["current_value"]) / _f(t["target_value"]) >= 0.8
    )

    esg_score = compute_esg_score(company_id, db)
    carbon_trend = compute_carbon_trend(company_id, db)

    return AnalyticsSummary(
        company_id=company_id,
        total_carbon_tco2e=round(total_carbon, 2),
        renewable_energy_pct=round(renewable_pct, 1),
        recycling_rate_pct=round(recycling_rate, 1),
        water_usage_ml=round(total_water_ml, 2),
        esg_score=esg_score,
        carbon_trend=carbon_trend,
        targets_on_track=on_track,
        targets_total=len(targets),
    )
