from pydantic import BaseModel
from datetime import datetime

# User Schema
class UserCreate(BaseModel):
    email: str
    password: str
    fullname: str
    
class UserOut(BaseModel):
    id: int
    email: str
    fullname: str
    is_admin: bool
    class Config:
        from_attributes = True
        
# Event Schema
class EventBase(BaseModel):
    title: str
    description: str
    location: str
    event_time: datetime
    
class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    image_url: str
    is_approved: bool
    owner_id: int
    participant_count: int = 0
    like_count: int = 0
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
        