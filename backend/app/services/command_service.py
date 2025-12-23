from sqlalchemy.orm import Session
from uuid import UUID
from app.models.event import StationEvent

def switch_source(db: Session, station_id: UUID, source: str, reason: str | None = None):
    """Record a control-plane command event the router can consume."""
    ev = StationEvent(
        station_id=station_id,
        type="source_switch_requested",
        payload={"source": source, "reason": reason},
    )
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return ev
