"""
Carbon Calculator Engine
Implements GHG Protocol Corporate Standard (Scope 1, 2, 3).
All emission factors are in tCO2e per unit.
Sources: EPA (2024), DEFRA (2024), IPCC AR6.
"""

from models.schemas import CarbonCalculatorInput, ScopeBreakdown


# ── Emission Factors (tCO2e per unit) ─────────────────────────────────────────

SCOPE1_FACTORS = {
    # Natural gas: kgCO2e/kWh (DEFRA 2024) → convert to tCO2e/kWh
    "natural_gas_kwh": 0.18316 / 1000,
    # Diesel: kgCO2e/litre (DEFRA 2024)
    "diesel_liters": 2.70400 / 1000,
    # Petrol/gasoline: kgCO2e/litre (DEFRA 2024)
    "petrol_liters": 2.34600 / 1000,
    # LPG: kgCO2e/litre (DEFRA 2024)
    "lpg_liters": 1.55400 / 1000,
}

# Scope 2: kgCO2e/kWh for purchased electricity by grid
SCOPE2_GRID_FACTORS = {
    "US": 0.38600 / 1000,   # EPA eGRID 2023 national average
    "UK": 0.20700 / 1000,   # DEFRA 2024
    "EU": 0.27500 / 1000,   # EEA 2023 average
    "global": 0.49000 / 1000,  # IEA 2023 world average
}

SCOPE3_FACTORS = {
    # Air travel: kgCO2e/passenger-km (DEFRA 2024, economy class, RF included)
    "flights_short_haul_km": 0.25500 / 1000,   # <3700 km
    "flights_long_haul_km": 0.19500 / 1000,    # >3700 km
    # Hotel nights: kgCO2e/room-night (DEFRA 2024)
    "hotel_nights": 31.00 / 1000,
    # Waste: kgCO2e/tonne of mixed waste to landfill (EPA 2024) → per kg
    "waste_kg": 0.46700 / 1000,
    # Water supply & treatment: kgCO2e/m3 (DEFRA 2024)
    "water_m3": 0.14900 / 1000,
}


# ── Calculation Engine ─────────────────────────────────────────────────────────

def calculate_carbon(inputs: CarbonCalculatorInput) -> ScopeBreakdown:
    grid_factor = SCOPE2_GRID_FACTORS.get(inputs.country_grid, SCOPE2_GRID_FACTORS["global"])

    # Scope 1
    s1_natural_gas = inputs.natural_gas_kwh * SCOPE1_FACTORS["natural_gas_kwh"]
    s1_diesel = inputs.diesel_liters * SCOPE1_FACTORS["diesel_liters"]
    s1_petrol = inputs.petrol_liters * SCOPE1_FACTORS["petrol_liters"]
    s1_lpg = inputs.lpg_liters * SCOPE1_FACTORS["lpg_liters"]
    scope1 = s1_natural_gas + s1_diesel + s1_petrol + s1_lpg

    # Scope 2
    s2_electricity = inputs.electricity_kwh * grid_factor
    scope2 = s2_electricity

    # Scope 3
    s3_flights_short = inputs.flights_short_haul_km * SCOPE3_FACTORS["flights_short_haul_km"]
    s3_flights_long = inputs.flights_long_haul_km * SCOPE3_FACTORS["flights_long_haul_km"]
    s3_hotel = inputs.hotel_nights * SCOPE3_FACTORS["hotel_nights"]
    s3_waste = inputs.waste_kg * SCOPE3_FACTORS["waste_kg"]
    s3_water = inputs.water_m3 * SCOPE3_FACTORS["water_m3"]
    scope3 = s3_flights_short + s3_flights_long + s3_hotel + s3_waste + s3_water

    total = scope1 + scope2 + scope3

    return ScopeBreakdown(
        scope1_tco2e=round(scope1, 4),
        scope2_tco2e=round(scope2, 4),
        scope3_tco2e=round(scope3, 4),
        total_tco2e=round(total, 4),
        breakdown={
            "scope1": {
                "natural_gas": round(s1_natural_gas, 4),
                "diesel": round(s1_diesel, 4),
                "petrol": round(s1_petrol, 4),
                "lpg": round(s1_lpg, 4),
                "subtotal": round(scope1, 4),
            },
            "scope2": {
                "electricity": round(s2_electricity, 4),
                "grid_used": inputs.country_grid,
                "emission_factor_tco2e_per_kwh": grid_factor,
                "subtotal": round(scope2, 4),
            },
            "scope3": {
                "flights_short_haul": round(s3_flights_short, 4),
                "flights_long_haul": round(s3_flights_long, 4),
                "hotel_stays": round(s3_hotel, 4),
                "waste": round(s3_waste, 4),
                "water": round(s3_water, 4),
                "subtotal": round(scope3, 4),
            },
        },
    )


def get_emission_factors() -> dict:
    """Return all emission factors for transparency / frontend display."""
    return {
        "scope1": SCOPE1_FACTORS,
        "scope2_grids": SCOPE2_GRID_FACTORS,
        "scope3": SCOPE3_FACTORS,
        "source": "DEFRA 2024, EPA eGRID 2023, IEA 2023",
        "methodology": "GHG Protocol Corporate Standard",
    }
