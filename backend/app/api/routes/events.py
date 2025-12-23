from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import UUID

from app.api.deps import get_db
from app.models.event import StationEvent
from app.schemas.event import EventOut

router = APIRouter(prefix="/stations/{station_id}", tags=["events"])

@router.get("/events", response_model=list[EventOut])
def list_events(station_id: UUID, limit: int = 50, db: Session = Depends(get_db)):
    limit = max(1, min(limit, 200))
    q = (
        select(StationEvent)
        .where(StationEvent.station_id == station_id)
        .order_by(StationEvent.created_at.desc())
        .limit(limit)
    )
    return db.scalars(q).all()
