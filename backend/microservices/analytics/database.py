from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import urllib
from starlette.testclient import TestClient
from . import crud

common_tags = ["connection"]
routeees = APIRouter()
global_variable = None
engine = None
SessionLocal = None

# Define your Pydantic model for the request data
class ConnectionRequest(BaseModel):
    database: str

# Define the endpoint to receive the database name from the frontend using POST
@routeees.put('/database-name', tags=common_tags)
async def connect_database(request: ConnectionRequest):
    global global_variable
    global engine
    global SessionLocal
    global_variable = request.database
    params = urllib.parse.quote_plus(
        f"driver={{ODBC Driver 17 for SQL Server}}; server=DESKTOP-M34IJQI; database={global_variable}; Trusted_Connection=yes; UID=DESKTOP-M34IJQI\\med aziz"
    )

    # Create the SQLAlchemy engine
    engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % params)

    # Create the SessionLocal
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    return {"message": "Database name set successfully"}

# Define the endpoint to get the database name using GET
@routeees.get("/status")
def read_status():
    return global_variable

# Define a function to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

 
