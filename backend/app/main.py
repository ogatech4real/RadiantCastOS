from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.security_middleware import SecureHeadersMiddleware
from app.core.metrics_middleware import MetricsMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.stations import router as stations_router
from app.api.routes.playlists import router as playlists_router
from app.api.routes.commands import router as commands_router
from app.api.routes.events import router as events_router
from app.api.routes.runtime import router as runtime_router
from app.api.routes.metrics import router as metrics_router

app = FastAPI(title="RadiantCastOS Control Plane", version="0.3.0")

app.add_middleware(MetricsMiddleware)

origins = settings.cors_list()
if origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-Requested-With"],
    )

app.add_middleware(SecureHeadersMiddleware, enabled=settings.secure_headers_enabled)

app.include_router(health_router)
app.include_router(stations_router)
app.include_router(playlists_router)
app.include_router(commands_router)
app.include_router(events_router)
app.include_router(runtime_router)
app.include_router(metrics_router)
