from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional
from models.schemas import (
    CarbonCreate, EnergyCreate, WasteCreate, WaterCreate,
    EmployeeCreate, SupplierCreate, EsgTargetCreate,
)
from services.db import get_db, rows_to_list

router = APIRouter(prefix="/api/esg", tags=["esg-data"])

DEFAULT_COMPANY = "8479cb95-2057-490d-813c-825e83d71890"


# ── Carbon Footprint ───────────────────────────────────────────────────────────

@router.get("/carbon")
async def get_carbon(
    company_id: str = Query(DEFAULT_COMPANY),
    scope: Optional[int] = Query(None, ge=1, le=3),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM carbon_footprint_details WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if scope:
        sql += " AND scope = :scope"
        params["scope"] = scope
    sql += " ORDER BY reporting_period DESC LIMIT :limit"
    params["limit"] = limit
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/carbon", status_code=201)
async def create_carbon(entry: CarbonCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO carbon_footprint_details
            (company_id, scope, category, source_description, emissions_co2_tons,
             calculation_method, emission_factor, activity_data, unit, reporting_period, verified)
        VALUES
            (:company_id, :scope, :category, :source_description, :emissions_co2_tons,
             :calculation_method, :emission_factor, :activity_data, :unit, :reporting_period, :verified)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── Energy Consumption ─────────────────────────────────────────────────────────

@router.get("/energy")
async def get_energy(
    company_id: str = Query(DEFAULT_COMPANY),
    energy_type: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM energy_consumption WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if energy_type:
        sql += " AND energy_type = :energy_type"
        params["energy_type"] = energy_type
    sql += " ORDER BY reporting_period DESC LIMIT :limit"
    params["limit"] = limit
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/energy", status_code=201)
async def create_energy(entry: EnergyCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO energy_consumption
            (company_id, facility_name, energy_type, source, consumption_kwh, cost, currency, reporting_period)
        VALUES
            (:company_id, :facility_name, :energy_type, :source, :consumption_kwh, :cost, :currency, :reporting_period)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── Waste Management ───────────────────────────────────────────────────────────

@router.get("/waste")
async def get_waste(
    company_id: str = Query(DEFAULT_COMPANY),
    disposal_method: Optional[str] = Query(None),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM waste_management_data WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if disposal_method:
        sql += " AND disposal_method = :disposal_method"
        params["disposal_method"] = disposal_method
    sql += " ORDER BY reporting_period DESC LIMIT :limit"
    params["limit"] = limit
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/waste", status_code=201)
async def create_waste(entry: WasteCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO waste_management_data
            (company_id, facility_name, waste_type, waste_category, amount_kg, disposal_method, cost, currency, reporting_period)
        VALUES
            (:company_id, :facility_name, :waste_type, :waste_category, :amount_kg, :disposal_method, :cost, :currency, :reporting_period)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── Water Usage ────────────────────────────────────────────────────────────────

@router.get("/water")
async def get_water(
    company_id: str = Query(DEFAULT_COMPANY),
    limit: int = Query(100, le=500),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM water_usage_details WHERE company_id = :company_id ORDER BY reporting_period DESC LIMIT :limit"
    rows = db.execute(text(sql), {"company_id": company_id, "limit": limit}).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/water", status_code=201)
async def create_water(entry: WaterCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO water_usage_details
            (company_id, facility_name, usage_type, source, consumption_liters, cost, currency, reporting_period)
        VALUES
            (:company_id, :facility_name, :usage_type, :source, :consumption_liters, :cost, :currency, :reporting_period)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── Employee Engagement ────────────────────────────────────────────────────────

@router.get("/employees")
async def get_employees(
    company_id: str = Query(DEFAULT_COMPANY),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM employee_engagement WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if category:
        sql += " AND category = :category"
        params["category"] = category
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/employees", status_code=201)
async def create_employee_metric(entry: EmployeeCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO employee_engagement
            (company_id, metric_name, category, value, unit, department, reporting_period, target_value)
        VALUES
            (:company_id, :metric_name, :category, :value, :unit, :department, :reporting_period, :target_value)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── Supply Chain ───────────────────────────────────────────────────────────────

@router.get("/suppliers")
async def get_suppliers(
    company_id: str = Query(DEFAULT_COMPANY),
    min_score: Optional[int] = Query(None, ge=0, le=100),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM supply_chain_metrics WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if min_score is not None:
        sql += " AND esg_score >= :min_score"
        params["min_score"] = min_score
    sql += " ORDER BY esg_score DESC"
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/suppliers", status_code=201)
async def create_supplier(entry: SupplierCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO supply_chain_metrics
            (company_id, supplier_name, supplier_category, esg_score, environmental_score,
             social_score, governance_score, certification_status, last_audit_date, next_audit_date)
        VALUES
            (:company_id, :supplier_name, :supplier_category, :esg_score, :environmental_score,
             :social_score, :governance_score, :certification_status, :last_audit_date, :next_audit_date)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


# ── ESG Targets ────────────────────────────────────────────────────────────────

@router.get("/targets")
async def get_targets(
    company_id: str = Query(DEFAULT_COMPANY),
    category: Optional[str] = Query(None),
    active_only: bool = Query(True),
    db: Session = Depends(get_db),
):
    sql = "SELECT * FROM esg_targets WHERE company_id = :company_id"
    params = {"company_id": company_id}
    if active_only:
        sql += " AND is_active = true"
    if category:
        sql += " AND category = :category"
        params["category"] = category
    sql += " ORDER BY target_date"
    rows = db.execute(text(sql), params).mappings().all()
    data = rows_to_list(rows)
    return {"data": data, "count": len(data)}


@router.post("/targets", status_code=201)
async def create_target(entry: EsgTargetCreate, db: Session = Depends(get_db)):
    sql = """
        INSERT INTO esg_targets
            (company_id, category, metric_name, target_value, current_value, unit, target_date, description, is_active)
        VALUES
            (:company_id, :category, :metric_name, :target_value, :current_value, :unit, :target_date, :description, :is_active)
        RETURNING *
    """
    row = db.execute(text(sql), entry.model_dump()).mappings().first()
    db.commit()
    return dict(row)


@router.patch("/targets/{target_id}/progress")
async def update_target_progress(target_id: str, current_value: float, db: Session = Depends(get_db)):
    sql = "UPDATE esg_targets SET current_value = :current_value WHERE id = :id RETURNING *"
    row = db.execute(text(sql), {"current_value": current_value, "id": target_id}).mappings().first()
    db.commit()
    if not row:
        raise HTTPException(status_code=404, detail="Target not found")
    return dict(row)
