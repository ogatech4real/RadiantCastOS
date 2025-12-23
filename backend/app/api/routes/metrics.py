from fastapi import APIRouter, Response, Depends
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

from app.api.deps import require_router_service

router = APIRouter(tags=["metrics"])

@router.get("/metrics")
def metrics(_=Depends(require_router_service)):
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
