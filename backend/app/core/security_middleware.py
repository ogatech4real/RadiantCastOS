from __future__ import annotations
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecureHeadersMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, enabled: bool = True):
        super().__init__(app)
        self.enabled = enabled

    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        if not self.enabled:
            return response

        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        response.headers.setdefault("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

        # Swagger UI needs scripts/styles
        if request.url.path.startswith("/docs") or request.url.path.startswith("/openapi.json"):
            response.headers.setdefault(
                "Content-Security-Policy",
                "default-src 'self' 'unsafe-inline'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'"
            )
        else:
            response.headers.setdefault("Content-Security-Policy", "default-src 'none'")
        return response
