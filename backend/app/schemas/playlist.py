from pydantic import BaseModel, Field
from uuid import UUID
from typing import Any

class PlaylistCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str | None = Field(default=None, max_length=512)

class PlaylistOut(BaseModel):
    id: UUID
    station_id: UUID
    name: str
    description: str | None

    class Config:
        from_attributes = True

class RotationRuleUpsert(BaseModel):
    rules_json: dict[str, Any]
