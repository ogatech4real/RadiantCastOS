from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.station import Station
from app.models.runtime import StationRuntimeState
from app.core.security import generate_encoder_key, hash_key

def create_station(db: Session, name: str, slug: str, hls_url: str | None):
    existing = db.scalar(select(Station).where(Station.slug == slug))
    if existing:
        raise ValueError("slug already exists")

    encoder_key = generate_encoder_key()
    station = Station(
        name=name,
        slug=slug,
        encoder_key_hash=hash_key(encoder_key),
        hls_url=hls_url,
    )
    db.add(station)
    db.commit()
    db.refresh(station)

    # initialize runtime desired-state
    rs = StationRuntimeState(station_id=station.id, desired_source='autodj', current_source='autodj')
    db.add(rs)
    db.commit()
    return station, encoder_key

def list_stations(db: Session):
    return db.scalars(select(Station).order_by(Station.created_at.desc())).all()

def get_station_by_slug(db: Session, slug: str):
    return db.scalar(select(Station).where(Station.slug == slug))
