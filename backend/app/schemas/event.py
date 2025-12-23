from pydantic import BaseModel
from uuid import UUID
from typing import Any

class EventOut(BaseModel):
    id: UUID
    station_id: UUID
    type: str
    payload: dict[str, Any]

    class Config:
        from_attributes = True
