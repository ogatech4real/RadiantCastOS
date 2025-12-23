from pydantic import BaseModel, Field
from uuid import UUID

class StationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    slug: str = Field(min_length=2, max_length=120)
    hls_url: str | None = None

class StationOut(BaseModel):
    id: UUID
    name: str
    slug: str
    is_active: bool
    hls_url: str | None

    class Config:
        from_attributes = True

class StationKeyOut(BaseModel):
    station_id: UUID
    encoder_key: str  # only returned at creation/rotation time
