from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    fullname = Column(String)
    is_admin = Column(Boolean, default=False)
    
    events = relationship("Event", back_populates="owner")
    participations = relationship("Participation", back_populates="user")


class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    location = Column(String, index=True)
    event_time = Column(DateTime)
    image_url = Column(String, nullable=True)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="events")
    participants = relationship("Participation", back_populates="event")
    likes = relationship("Like", back_populates="event")


class Participation(Base):
    __tablename__ = "participations"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    user = relationship("User", back_populates="participations")
    event = relationship("Event", back_populates="participants")


class Like(Base):
    __tablename__ = "likes"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    event_id = Column(Integer, ForeignKey("events.id"), primary_key=True)
    
    event = relationship("Event", back_populates="likes")