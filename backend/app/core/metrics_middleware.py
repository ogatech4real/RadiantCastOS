import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.core.metrics import REQUESTS_TOTAL, REQUEST_LATENCY

class MetricsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        response: Response = await call_next(request)
        elapsed = time.time() - start

        path = request.url.path
        # basic cardinality control
        if path.startswith("/stations/") and len(path.split("/")) > 2:
            path = "/stations/:id/*"

        REQUESTS_TOTAL.labels(request.method, path, str(response.status_code)).inc()
        REQUEST_LATENCY.labels(request.method, path).observe(elapsed)
        return response
