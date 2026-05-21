from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime
from enum import Enum


# ── Enums ──────────────────────────────────────────────────────────────────────

class EsgCategory(str, Enum):
    environmental = "environmental"
    social = "social"
    governance = "governance"


class EnergyType(str, Enum):
    renewable = "renewable"
    non_renewable = "non-renewable"
    grid = "grid"


class DisposalMethod(str, Enum):
    recycled = "recycled"
    landfill = "landfill"
    incinerated = "incinerated"
    composted = "composted"


# ── Carbon Footprint ───────────────────────────────────────────────────────────

class CarbonEntry(BaseModel):
    id: Optional[str] = None
    company_id: str
    scope: int = Field(..., ge=1, le=3)
    category: Optional[str] = None
    source_description: Optional[str] = None
    emissions_co2_tons: float
    calculation_method: Optional[str] = None
    emission_factor: Optional[float] = None
    activity_data: Optional[float] = None
    unit: Optional[str] = None
    reporting_period: date
    verified: bool = False


class CarbonCreate(BaseModel):
    company_id: str
    scope: int = Field(..., ge=1, le=3)
    category: Optional[str] = None
    source_description: Optional[str] = None
    emissions_co2_tons: float
    calculation_method: Optional[str] = "direct"
    emission_factor: Optional[float] = None
    activity_data: Optional[float] = None
    unit: Optional[str] = None
    reporting_period: date
    verified: bool = False


# ── Energy Consumption ─────────────────────────────────────────────────────────

class EnergyEntry(BaseModel):
    id: Optional[str] = None
    company_id: str
    facility_name: Optional[str] = None
    energy_type: str
    source: Optional[str] = None
    consumption_kwh: float
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


class EnergyCreate(BaseModel):
    company_id: str
    facility_name: Optional[str] = None
    energy_type: str
    source: Optional[str] = None
    consumption_kwh: float
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


# ── Waste Management ───────────────────────────────────────────────────────────

class WasteEntry(BaseModel):
    id: Optional[str] = None
    company_id: str
    facility_name: Optional[str] = None
    waste_type: Optional[str] = None
    waste_category: Optional[str] = None
    amount_kg: float
    disposal_method: Optional[str] = None
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


class WasteCreate(BaseModel):
    company_id: str
    facility_name: Optional[str] = None
    waste_type: Optional[str] = None
    waste_category: Optional[str] = None
    amount_kg: float
    disposal_method: Optional[str] = None
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


# ── Water Usage ────────────────────────────────────────────────────────────────

class WaterEntry(BaseModel):
    id: Optional[str] = None
    company_id: str
    facility_name: Optional[str] = None
    usage_type: Optional[str] = None
    source: Optional[str] = None
    consumption_liters: float
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


class WaterCreate(BaseModel):
    company_id: str
    facility_name: Optional[str] = None
    usage_type: Optional[str] = None
    source: Optional[str] = None
    consumption_liters: float
    cost: Optional[float] = None
    currency: str = "USD"
    reporting_period: date


# ── Employee Engagement ────────────────────────────────────────────────────────

class EmployeeMetric(BaseModel):
    id: Optional[str] = None
    company_id: str
    metric_name: str
    category: Optional[str] = None
    value: float
    unit: Optional[str] = None
    department: Optional[str] = None
    reporting_period: Optional[date] = None
    target_value: Optional[float] = None


class EmployeeCreate(BaseModel):
    company_id: str
    metric_name: str
    category: Optional[str] = None
    value: float
    unit: Optional[str] = None
    department: Optional[str] = None
    reporting_period: Optional[date] = None
    target_value: Optional[float] = None


# ── Supply Chain ───────────────────────────────────────────────────────────────

class SupplierMetric(BaseModel):
    id: Optional[str] = None
    company_id: str
    supplier_name: str
    supplier_category: Optional[str] = None
    esg_score: Optional[int] = Field(None, ge=0, le=100)
    environmental_score: Optional[int] = Field(None, ge=0, le=100)
    social_score: Optional[int] = Field(None, ge=0, le=100)
    governance_score: Optional[int] = Field(None, ge=0, le=100)
    certification_status: Optional[str] = None
    last_audit_date: Optional[date] = None
    next_audit_date: Optional[date] = None


class SupplierCreate(BaseModel):
    company_id: str
    supplier_name: str
    supplier_category: Optional[str] = None
    esg_score: Optional[int] = Field(None, ge=0, le=100)
    environmental_score: Optional[int] = Field(None, ge=0, le=100)
    social_score: Optional[int] = Field(None, ge=0, le=100)
    governance_score: Optional[int] = Field(None, ge=0, le=100)
    certification_status: Optional[str] = None
    last_audit_date: Optional[date] = None
    next_audit_date: Optional[date] = None


# ── ESG Targets ────────────────────────────────────────────────────────────────

class EsgTarget(BaseModel):
    id: Optional[str] = None
    company_id: str
    category: EsgCategory
    metric_name: str
    target_value: Optional[float] = None
    current_value: Optional[float] = None
    unit: Optional[str] = None
    target_date: Optional[date] = None
    description: Optional[str] = None
    is_active: bool = True


class EsgTargetCreate(BaseModel):
    company_id: str
    category: EsgCategory
    metric_name: str
    target_value: Optional[float] = None
    current_value: Optional[float] = None
    unit: Optional[str] = None
    target_date: Optional[date] = None
    description: Optional[str] = None


# ── Carbon Calculator ──────────────────────────────────────────────────────────

class CarbonCalculatorInput(BaseModel):
    # Scope 1 — Direct
    natural_gas_kwh: float = 0.0
    diesel_liters: float = 0.0
    petrol_liters: float = 0.0
    lpg_liters: float = 0.0
    # Scope 2 — Purchased electricity
    electricity_kwh: float = 0.0
    country_grid: str = "US"          # US | UK | EU | global
    # Scope 3 — Value chain
    flights_short_haul_km: float = 0.0   # <3700 km
    flights_long_haul_km: float = 0.0    # >3700 km
    hotel_nights: float = 0.0
    waste_kg: float = 0.0
    water_m3: float = 0.0
    # Company context
    company_id: Optional[str] = None


class ScopeBreakdown(BaseModel):
    scope1_tco2e: float
    scope2_tco2e: float
    scope3_tco2e: float
    total_tco2e: float
    breakdown: dict


class CarbonCalculatorResponse(BaseModel):
    input: CarbonCalculatorInput
    result: ScopeBreakdown
    methodology: str = "GHG Protocol Corporate Standard"


# ── Analytics ──────────────────────────────────────────────────────────────────

class ESGScore(BaseModel):
    environmental: float
    social: float
    governance: float
    overall: float
    grade: str


class TrendPoint(BaseModel):
    period: str
    value: float


class AnalyticsSummary(BaseModel):
    company_id: str
    total_carbon_tco2e: float
    renewable_energy_pct: float
    recycling_rate_pct: float
    water_usage_ml: float
    esg_score: ESGScore
    carbon_trend: List[TrendPoint]
    targets_on_track: int
    targets_total: int
