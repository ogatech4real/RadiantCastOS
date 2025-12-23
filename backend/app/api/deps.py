from __future__ import annotations
from fastapi import Header, HTTPException, Depends
from app.core.db import SessionLocal
from app.core.auth import verify_supabase_jwt, verify_router_token, AuthError

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(authorization: str | None = Header(default=None)):
    # For production: validate Supabase JWT (Bearer)
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    try:
        return verify_supabase_jwt(token)
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))

def require_router_service(authorization: str | None = Header(default=None)):
    # Router calls internal endpoints with Authorization: Bearer <ROUTER_SERVICE_TOKEN>
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    try:
        verify_router_token(token)
    except AuthError as e:
        raise HTTPException(status_code=403, detail=str(e))
    return True
