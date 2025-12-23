import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base

class StationRuntimeState(Base):
    __tablename__ = "station_runtime_state"

    station_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("stations.id"), primary_key=True)

    desired_source: Mapped[str] = mapped_column(String(16), nullable=False, default="autodj")  # live|autodj|fallback
    current_source: Mapped[str] = mapped_column(String(16), nullable=False, default="autodj")

    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
