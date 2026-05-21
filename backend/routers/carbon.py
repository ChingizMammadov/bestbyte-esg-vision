from fastapi import APIRouter
from models.schemas import CarbonCalculatorInput, CarbonCalculatorResponse
from services.carbon_engine import calculate_carbon, get_emission_factors

router = APIRouter(prefix="/api/carbon", tags=["carbon-calculator"])


@router.post("/calculate", response_model=CarbonCalculatorResponse)
async def calculate_emissions(inputs: CarbonCalculatorInput):
    """
    Calculate carbon emissions (Scope 1, 2, 3) using GHG Protocol.
    Returns tCO2e breakdown by scope and source.
    """
    result = calculate_carbon(inputs)
    return CarbonCalculatorResponse(input=inputs, result=result)


@router.get("/emission-factors")
async def emission_factors():
    """Return all emission factors used in calculations (for transparency)."""
    return get_emission_factors()


@router.get("/grids")
async def available_grids():
    """Return supported electricity grid regions."""
    return {
        "grids": [
            {"code": "US", "label": "United States (EPA eGRID 2023)", "factor_tco2e_per_kwh": 0.000386},
            {"code": "UK", "label": "United Kingdom (DEFRA 2024)", "factor_tco2e_per_kwh": 0.000207},
            {"code": "EU", "label": "European Union (EEA 2023)", "factor_tco2e_per_kwh": 0.000275},
            {"code": "global", "label": "Global Average (IEA 2023)", "factor_tco2e_per_kwh": 0.000490},
        ]
    }
