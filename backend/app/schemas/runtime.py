from pydantic import BaseModel, Field
from uuid import UUID

class DesiredSourceSetIn(BaseModel):
    desired_source: str = Field(pattern="^(live|autodj|fallback)$")
    reason: str | None = None

class RuntimeOut(BaseModel):
    station_id: UUID
    desired_source: str
    current_source: str

    class Config:
        from_attributes = True
