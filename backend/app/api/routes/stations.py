from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.station import StationCreate, StationOut, StationKeyOut
from app.services.station_service import create_station, list_stations, get_station_by_slug

router = APIRouter(prefix="/stations", tags=["stations"])

@router.post("", response_model=StationKeyOut)
def create(payload: StationCreate, db: Session = Depends(get_db)):
    try:
        station, encoder_key = create_station(db, payload.name, payload.slug, payload.hls_url)
        return {"station_id": station.id, "encoder_key": encoder_key}
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))

@router.get("", response_model=list[StationOut])
def list_all(db: Session = Depends(get_db)):
    return list_stations(db)

@router.get("/{slug}", response_model=StationOut)
def get_one(slug: str, db: Session = Depends(get_db)):
    st = get_station_by_slug(db, slug)
    if not st:
        raise HTTPException(status_code=404, detail="station not found")
    return st
