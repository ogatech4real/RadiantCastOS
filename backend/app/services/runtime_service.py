from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import UUID
from datetime import datetime

from app.models.runtime import StationRuntimeState
from app.models.event import StationEvent

VALID_SOURCES = {"live", "autodj", "fallback"}

def get_runtime(db: Session, station_id: UUID) -> StationRuntimeState | None:
    return db.scalar(select(StationRuntimeState).where(StationRuntimeState.station_id == station_id))

def set_desired_source(db: Session, station_id: UUID, desired_source: str, reason: str | None = None) -> StationRuntimeState:
    if desired_source not in VALID_SOURCES:
        raise ValueError("invalid desired_source")

    rs = get_runtime(db, station_id)
    if not rs:
        rs = StationRuntimeState(station_id=station_id, desired_source="autodj", current_source="autodj")
        db.add(rs)

    rs.desired_source = desired_source
    rs.updated_at = datetime.utcnow()

    # audit event
    ev = StationEvent(
        station_id=station_id,
        type="desired_source_set",
        payload={"desired_source": desired_source, "reason": reason},
    )
    db.add(ev)
    db.commit()
    db.refresh(rs)
    return rs

def set_current_source(db: Session, station_id: UUID, current_source: str) -> StationRuntimeState:
    if current_source not in VALID_SOURCES:
        raise ValueError("invalid current_source")
    rs = get_runtime(db, station_id)
    if not rs:
        rs = StationRuntimeState(station_id=station_id, desired_source="autodj", current_source="autodj")
        db.add(rs)
    rs.current_source = current_source
    rs.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(rs)
    return rs
