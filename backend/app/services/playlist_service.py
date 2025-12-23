from sqlalchemy.orm import Session
from sqlalchemy import select
from uuid import UUID

from app.models.playlist import Playlist, RotationRule

def create_playlist(db: Session, station_id: UUID, name: str, description: str | None):
    pl = Playlist(station_id=station_id, name=name, description=description)
    db.add(pl)
    db.commit()
    db.refresh(pl)
    return pl

def list_playlists(db: Session, station_id: UUID):
    return db.scalars(select(Playlist).where(Playlist.station_id == station_id)).all()

def upsert_rotation_rule(db: Session, station_id: UUID, rules_json: dict):
    latest = db.scalar(
        select(RotationRule)
        .where(RotationRule.station_id == station_id)
        .order_by(RotationRule.created_at.desc())
    )
    version = 1 if not latest else (latest.version + 1)
    rr = RotationRule(station_id=station_id, version=version, rules_json=rules_json)
    db.add(rr)
    db.commit()
    db.refresh(rr)
    return rr

def get_latest_rotation_rule(db: Session, station_id: UUID):
    return db.scalar(
        select(RotationRule)
        .where(RotationRule.station_id == station_id)
        .order_by(RotationRule.created_at.desc())
    )
