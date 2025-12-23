from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.api.deps import get_db
from app.schemas.playlist import PlaylistCreate, PlaylistOut, RotationRuleUpsert
from app.services.playlist_service import (
    create_playlist, list_playlists, upsert_rotation_rule, get_latest_rotation_rule
)

router = APIRouter(prefix="/stations/{station_id}", tags=["playlists"])

@router.post("/playlists", response_model=PlaylistOut)
def create_pl(station_id: UUID, payload: PlaylistCreate, db: Session = Depends(get_db)):
    return create_playlist(db, station_id, payload.name, payload.description)

@router.get("/playlists", response_model=list[PlaylistOut])
def list_pl(station_id: UUID, db: Session = Depends(get_db)):
    return list_playlists(db, station_id)

@router.put("/rotation-rule")
def upsert_rr(station_id: UUID, payload: RotationRuleUpsert, db: Session = Depends(get_db)):
    rr = upsert_rotation_rule(db, station_id, payload.rules_json)
    return {"station_id": station_id, "version": rr.version, "rules_json": rr.rules_json}

@router.get("/rotation-rule")
def get_rr(station_id: UUID, db: Session = Depends(get_db)):
    rr = get_latest_rotation_rule(db, station_id)
    if not rr:
        raise HTTPException(status_code=404, detail="no rotation rule configured")
    return {"station_id": station_id, "version": rr.version, "rules_json": rr.rules_json}
