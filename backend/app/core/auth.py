from __future__ import annotations
from functools import lru_cache
from typing import Any, Optional

import httpx
from jose import jwt

from app.core.config import settings

class AuthError(Exception):
    pass

@lru_cache(maxsize=1)
def _jwks_cache() -> dict[str, Any]:
    # cached in-process; in prod consider timed cache + background refresh
    if not settings.supabase_jwks_url:
        raise AuthError("SUPABASE_JWKS_URL not configured")
    r = httpx.get(settings.supabase_jwks_url, timeout=5.0)
    r.raise_for_status()
    return r.json()

def verify_supabase_jwt(token: str) -> dict[str, Any]:
    jwks = _jwks_cache()
    headers = jwt.get_unverified_header(token)
    kid = headers.get("kid")
    keys = jwks.get("keys", [])
    key = next((k for k in keys if k.get("kid") == kid), None)
    if not key:
        raise AuthError("JWT key not found")
    claims = jwt.decode(
        token,
        key,
        algorithms=[headers.get("alg", "RS256")],
        options={"verify_aud": False},
    )
    return claims

def verify_router_token(token: str) -> None:
    # token is a simple shared secret for internal service-to-service auth
    if token != settings.router_service_token:
        raise AuthError("Invalid router token")
