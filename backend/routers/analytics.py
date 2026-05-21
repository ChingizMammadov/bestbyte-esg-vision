from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from services.db import get_db
from services.esg_analytics import (
    compute_analytics_summary,
    compute_esg_score,
    compute_carbon_trend,
    compute_environmental_score,
    compute_social_score,
    compute_governance_score,
)

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

DEFAULT_COMPANY = "8479cb95-2057-490d-813c-825e83d71890"


@router.get("/summary")
async def analytics_summary(company_id: str = Query(DEFAULT_COMPANY), db: Session = Depends(get_db)):
    return compute_analytics_summary(company_id, db)


@router.get("/score")
async def esg_score(company_id: str = Query(DEFAULT_COMPANY), db: Session = Depends(get_db)):
    return compute_esg_score(company_id, db)


@router.get("/carbon-trend")
async def carbon_trend(
    company_id: str = Query(DEFAULT_COMPANY),
    months: int = Query(12, ge=1, le=36),
    db: Session = Depends(get_db),
):
    return {"trend": compute_carbon_trend(company_id, db, months)}


@router.get("/scores/breakdown")
async def score_breakdown(company_id: str = Query(DEFAULT_COMPANY), db: Session = Depends(get_db)):
    return {
        "environmental": {
            "score": compute_environmental_score(company_id, db),
            "methodology": "40% renewable energy share + 30% recycling rate + 30% env target progress",
        },
        "social": {
            "score": compute_social_score(company_id, db),
            "methodology": "35% employee satisfaction + 30% gender diversity + 35% safety record",
        },
        "governance": {
            "score": compute_governance_score(company_id, db),
            "methodology": "Average progress across all active governance targets",
        },
    }
