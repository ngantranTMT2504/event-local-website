from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
import database, models, auth, schemas

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.put("/approve/{event_id}")
def approve_event(event_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    event.is_approved = True
    db.commit()
    return {"message": "Event approved"}

@router.get("/events/pending", response_model=List[schemas.EventOut])
def get_pending_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, le=100),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    query = db.query(models.Event).filter(models.Event.is_approved == False).order_by(models.Event.created_at.desc())
    events = query.offset(skip).limit(limit).all()
    for event in events:
        event.participant_count = len(event.participants)
        event.like_count = len(event.likes)
    
    return events

@router.get("/users", response_model=List[schemas.UserOut])
def get_all_users(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, gt=0, le=100, description="Number of records to retrieve"),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    users = db.query(models.User).order_by(models.User.id.asc()).offset(skip).limit(limit).all()
    return users
