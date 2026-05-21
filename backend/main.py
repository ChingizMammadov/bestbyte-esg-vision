"""
BestByte ESG Vision — Backend API
FastAPI application with modular router structure.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import init_db
from routers import health, esg, analytics, carbon, reports

# Legacy endpoints (uploadfile, /report) kept for backwards compatibility
from routers.legacy import legacy_router

load_dotenv()
init_db()

app = FastAPI(
    title="BestByte ESG Vision API",
    description="Backend API for the BestByte ESG Intelligence Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ───────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    os.getenv("FRONTEND_URL", ""),
]
ALLOWED_ORIGINS = [o for o in ALLOWED_ORIGINS if o]  # drop empty strings

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ────────────────────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(esg.router)
app.include_router(analytics.router)
app.include_router(carbon.router)
app.include_router(reports.router)
app.include_router(legacy_router)


@app.get("/")
async def root():
    return {
        "name": "BestByte ESG Vision API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }
