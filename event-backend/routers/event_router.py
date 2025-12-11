from fastapi import APIRouter, Form, File, Depends, UploadFile, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import shutil, os
import database, schemas, models, auth


router = APIRouter(tags=["Events"])

@router.post("/events/", response_model=schemas.EventOut)
def create_event(
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    event_time: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
): 
    image_path = None
    if file:
        file_location = f"static/images/{file.filename}"
        with open(file_location, "wb+") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_path = file_location

    new_event = models.Event(
        title=title,
        description=description,
        location=location,
        event_time=event_time,
        image_url=image_path,
        owner_id=current_user.id,
        is_approved=False 
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.get("/events/", response_model=List[schemas.EventOut])
def get_events(
    location: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, gt=0, le=100),
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Event).filter(models.Event.is_approved == True)
    if location:
        query = query.filter(models.Event.location.ilike(f"%{location}%"))
    
    query = query.order_by(models.Event.created_at.desc())
    events = query.offset(skip).limit(limit).all()
    
    for event in events:
        event.participant_count = len(event.participants)
        event.like_count = len(event.likes)
        
    return events

@router.post("/events/{event_id}/join")
def join_event(event_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    participation = db.query(models.Participation).filter_by(user_id=current_user.id, event_id=event_id).first()
    if participation:
        return {"message": "Already joined"}
    
    new_part = models.Participation(user_id=current_user.id, event_id=event_id)
    db.add(new_part)
    db.commit()
    return {"message": "Joined successfully"}


@router.post("/events/{event_id}/like")
def like_event(event_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    like = db.query(models.Like).filter_by(user_id=current_user.id, event_id=event_id).first()
    if like:
         db.delete(like) 
         db.commit()
         return {"message": "Unliked"}
    
    new_like = models.Like(user_id=current_user.id, event_id=event_id)
    db.add(new_like)
    db.commit()
    return {"message": "Liked"}