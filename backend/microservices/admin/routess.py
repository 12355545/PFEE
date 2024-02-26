from fastapi.params import Depends
from typing import List 
from .database import get_db

from microservices.shared import models,schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from microservices.authentication.routes import decode_access_token
routess = APIRouter()

from pydantic import BaseModel

class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    is_active: bool
    role: str

@routess.get("/users", response_model=List[UserOut], tags=["Admin"])
def get_users(db: Session = Depends(get_db), token: str = Depends(decode_access_token)):
    result = db.query(models.User, models.Role).\
        join(models.user_association_role, models.User.id == models.user_association_role.c.user_id).\
        join(models.Role, models.user_association_role.c.role_id == models.Role.id).\
        filter(models.Role.name != 'SUPER_ADMIN').all()
    
    users = []
    for user, role in result:
        user_out = UserOut(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            role=role.name,
        )
        users.append(user_out)
    
    return users

from sqlalchemy import update

@routess.put("/validateaccount/{user_id}", tags=["Admin"])
def update(user_id: int, db: Session = Depends(get_db), token: str = Depends(decode_access_token)):
    # Fetch the user record
    print(user_id)
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        # Handle the case where user does not exist
        return {"error": "User not found"}

    # Update the is_active field to 1
    user.is_active = 1

    # Commit the changes to the database
    db.commit()

    return {"message": "User account validated successfully"}

@routess.put("/invalidateaccount/{user_id}", tags=["Admin"])
def update(user_id: int, db: Session = Depends(get_db), token: str = Depends(decode_access_token)):
    # Fetch the user record
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if user is None:
        # Handle the case where user does not exist
        return {"error": "User not found"}

    # Update the is_active field to 1
    user.is_active = 0

    # Commit the changes to the database
    db.commit()

    return {"message": "User account validated successfully"}
