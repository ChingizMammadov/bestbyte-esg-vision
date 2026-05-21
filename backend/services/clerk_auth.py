import os
import jwt
from jwt import PyJWKClient
from fastapi import HTTPException

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL", "")

_jwks_client: PyJWKClient | None = None


def _get_jwks_client() -> PyJWKClient:
    global _jwks_client
    if _jwks_client is None:
        _jwks_client = PyJWKClient(CLERK_JWKS_URL, cache_keys=True)
    return _jwks_client


def verify_token(token: str) -> dict:
    if not CLERK_JWKS_URL:
        raise HTTPException(status_code=500, detail="CLERK_JWKS_URL not configured")
    try:
        client = _get_jwks_client()
        signing_key = client.get_signing_key_from_jwt(token)
        return jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            options={"require": ["sub", "exp"]},
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")


def get_user_id(payload: dict) -> str:
    return payload.get("sub", "anonymous")
