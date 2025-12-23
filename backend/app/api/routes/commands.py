from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from pydantic import BaseModel, Field

from app.api.deps import get_db
from app.services.command_service import switch_source

router = APIRouter(prefix="/stations/{station_id}", tags=["commands"])

class SwitchSourceIn(BaseModel):
    source: str = Field(pattern="^(live|autodj|fallback)$")
    reason: str | None = None

@router.post("/commands/switch-source")
def cmd_switch_source(station_id: UUID, payload: SwitchSourceIn, db: Session = Depends(get_db)):
    ev = switch_source(db, station_id, payload.source, payload.reason)
    return {"event_id": str(ev.id), "type": ev.type, "payload": ev.payload}
