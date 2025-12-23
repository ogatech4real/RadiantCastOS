from __future__ import annotations
from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List

class Settings(BaseSettings):
    app_env: str = "local"
    database_url: str

    # Supabase Auth (JWT via JWKS)
    supabase_url: str | None = None
    supabase_jwks_url: str | None = None

    # Internal service token for Router (Bearer token)
    router_service_token: str = "change-me"

    # CORS
    cors_allowed_origins: str = ""

    # Security headers and proxy trust
    secure_headers_enabled: bool = True
    trusted_proxy_count: int = 0

    class Config:
        env_file = ".env"
        case_sensitive = False

    @field_validator("supabase_jwks_url", mode="before")
    @classmethod
    def derive_jwks(cls, v, info):
        if v:
            return v
        supabase_url = info.data.get("supabase_url")
        if supabase_url:
            return supabase_url.rstrip("/") + "/auth/v1/.well-known/jwks.json"
        return None

    def cors_list(self) -> List[str]:
        if not self.cors_allowed_origins.strip():
            return []
        return [o.strip() for o in self.cors_allowed_origins.split(",") if o.strip()]

settings = Settings()
