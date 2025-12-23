from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.api.deps import get_db, require_router_service
from app.schemas.runtime import DesiredSourceSetIn, RuntimeOut
from app.services.runtime_service import get_runtime, set_desired_source, set_current_source

router = APIRouter(prefix="/stations/{station_id}", tags=["runtime"])

@router.get("/runtime", response_model=RuntimeOut)
def get_state(station_id: UUID, db: Session = Depends(get_db), _=Depends(require_router_service)):
    rs = get_runtime(db, station_id)
    if not rs:
        raise HTTPException(status_code=404, detail="runtime state not found")
    return rs

@router.post("/desired-source", response_model=RuntimeOut)
def set_desired(station_id: UUID, payload: DesiredSourceSetIn, db: Session = Depends(get_db), _=Depends(require_router_service)):
    try:
        return set_desired_source(db, station_id, payload.desired_source, payload.reason)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/current-source", response_model=RuntimeOut)
def set_current(station_id: UUID, payload: DesiredSourceSetIn, db: Session = Depends(get_db), _=Depends(require_router_service)):
    # re-use schema (desired_source field) to avoid duplication
    try:
        return set_current_source(db, station_id, payload.desired_source)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
