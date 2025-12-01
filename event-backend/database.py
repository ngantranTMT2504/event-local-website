from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib.parse
from config import settings

encoded_password = urllib.parse.quote_plus(settings.DB_PASSWORD)

SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{settings.DB_USER}:{encoded_password}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"

# The engine provides connectivity;
engine = create_engine(SQLALCHEMY_DATABASE_URL)
# The session uses that connection to perform tasks and manage transactions.
SessionLocal = sessionmaker(autocommit =False , autoflush=False, bind=engine)

Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 