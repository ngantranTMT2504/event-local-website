from fastapi import FastAPI
from database import engine, Base
from routers import auth_router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

# Create a table in the DB (for dev only, prod should use Alembic migrate)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Local Event social")

if not os.path.exists("static/images"):
    os.makedirs("static/images")
    
# Mount the static directory for the Frontend to access images
app.mount("/static", StaticFiles(directory="static"), name="static")   

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # URL của React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)

@app.get("/")
def root():
    return {"message": "Welcome to Local Event API"}