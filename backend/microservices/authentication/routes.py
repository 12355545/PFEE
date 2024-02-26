from fastapi.params import Depends
from ..email.config import HOST, USERNAME, PASSWORD, PORT
from typing import List, Optional
from smtplib import SMTP
from email.message import EmailMessage
from fastapi import BackgroundTasks
from microservices.shared.models import User,Role
from microservices.shared import models
from fastapi import status
from sqlalchemy.orm import Session
from .database import get_db
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pyodbc
 
from .hashing import Hash,pwd_cxt

from .jwttoken import create_access_token
routers = APIRouter()
conn_str = "driver={ODBC Driver 17 for SQL Server}; server=DESKTOP-M34IJQI; database=users;Trusted_Connection=yes;UID=DESKTOP-M34IJQI\med aziz"
db_connection = pyodbc.connect(conn_str)

common_tags = ["Authentication"]




class User(BaseModel):
    
    full_name: str
    email: str
    hashed_password: str
    role: str
    
"""
class Role(BaseModel):
    name:str
"""


class Login(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
class UserResponse(BaseModel):
    token: str
    full_name: str
    id: int

class ResponseModel(BaseModel):
    data: List[UserResponse]
from enum import Enum

class RoleType(str, Enum):
    SUPER_ADMIN = "super_admin"
    DEVELOPER = "developer"
    DECIDEUR = "decideur"
    


from typing import Dict, Any
@routers.post("/register/", response_model=ResponseModel,tags=common_tags)
def register(request: User,  db: Session = Depends(get_db)):
     # Check if the email already exists in the database
    if db.query(models.User).filter(models.User.email == request.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already exists')

    hashed_pass = Hash.bcrypt(request.hashed_password)
    db_user = models.User(full_name=request.full_name, email=request.email, hashed_password=hashed_pass,is_active=0)
    print("hhhhhhhhhhhhhhh")
    
    
    
    role = db.query(Role).filter(Role.name == request.role).first()
    print('vvvvvvvvvvvvvvvvvvvvvv')
    print(role)
    if not role:
        role = Role(name=request.role)
        db.add(role)
        db.commit()
    print('fvvvvvvvddddddddddddddd')
    db_user.roles.append(role)

    db.add(db_user)
    db.commit()

    jwt_token = create_access_token(data={"role": [role.name for role in db_user.roles]})

    response_data=[
        {"token": jwt_token,
        "full_name": db_user.full_name,
        "id":db_user.id
        }
    ]
 
    return {"data": response_data}
class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    full_name: str
    id: int
@routers.post('/sign-up',response_model=LoginResponse,tags=common_tags)
def login(request: Login):
    cursor = db_connection.cursor()
    cursor.execute("""
        SELECT U.*, R.name as role_name 
        FROM utilisateur U
        INNER JOIN user_association_role UA
        ON U.id = UA.user_id
        INNER JOIN roles R
        ON UA.role_id = R.id
        WHERE U.email = ?
    """, (request.email,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail=f'No user found with the email: {request.email}')
    if not Hash.verify(user.hashed_password, request.password):
        raise HTTPException(status_code=400, detail='Incorrect email or password')

    if not user.is_active:
        raise HTTPException(status_code=400, detail='User is not active. Please contact the admin.')

    access_token = create_access_token(data={"sub": user.role_name })
    return {"access_token": access_token, "token_type": "bearer", "full_name": user.full_name, "id": user.id}


class PasswordChangeRequest(BaseModel):
     
    old_password: str
    new_password: str
    
@routers.post('/change-password/{id}',tags=common_tags)
def change_password(id :int,request: PasswordChangeRequest):
    cursor = db_connection.cursor()
    cursor.execute("SELECT hashed_password FROM utilisateur WHERE id = ?", (id,))
    user = cursor.fetchone()
    print(user[0])
    if not user:
        raise HTTPException(status_code=404, detail=f'No user found with the id: {id}')
    print('true')
    hashed_password = Hash.verify(user[0],request.old_password)
    print(f"Hashed Password: {hashed_password}")
    if not hashed_password :
        
        raise HTTPException(status_code=400, detail='Incorrect old password')
    print("ggggg")
    hashed_new_password=Hash.bcrypt(request.new_password)
    
    
    cursor.execute("UPDATE utilisateur SET hashed_password = ? WHERE id = ?", (hashed_new_password, id))
    db_connection.commit()
    return {"message": "Password changed successfully"}


class NamepasswordChangeRequest(BaseModel):
     
    Fullname: str
    Email: str
    
@routers.post('/change-name-email/{id}',tags=common_tags)
def change_password(id :int,request: NamepasswordChangeRequest):
    cursor = db_connection.cursor()
    cursor.execute("SELECT full_name,email FROM utilisateur WHERE id = ?", (id,))
    user = cursor.fetchone()
     
    if not user:
        raise HTTPException(status_code=404, detail=f'No user found with the id: {id}')
    
    cursor.execute("UPDATE utilisateur SET email = ? , full_name = ? WHERE id =?", (request.Email, request.Fullname,id))
    db_connection.commit()
    return {"message": "Profil changed successfully"}











  
class PasswordResetRequest(BaseModel):
    email:str
@routers.post("/request",tags=common_tags)
async def reset_request(user_email: PasswordResetRequest, background_tasks: BackgroundTasks):
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE email=?", user_email.email)
    user = cursor.fetchone()

    if user is not None:
        token = create_access_token({"email": user[2]})
       

        reset_link = f"http://localhost:4200/reset?token={token}"

        def send_email_task():
            try:
                message = EmailMessage()
                message['Subject'] = 'Password Reset'
                message['From'] =  USERNAME
                message['To'] = user_email.email
                message.set_content(reset_link, subtype="html")

                with SMTP(HOST, PORT) as server:
                    server.starttls()
                    server.login(USERNAME, PASSWORD)
                    server.send_message(message)

            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

        background_tasks.add_task(send_email_task)
        return {"message": "Email sent successfully"}

    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Your details were not found. Invalid email address."
        )

 
class PasswordReset(BaseModel):
    password: str
from jose import jwt
from sqlalchemy import create_engine
from sqlalchemy.sql import text

import json
from fastapi.encoders import jsonable_encoder

# Create a SQLAlchemy engine
engine = create_engine("mssql+pyodbc://DESKTOP-M34IJQI/users?driver=ODBC Driver 17 for SQL Server")


from typing import Dict, Optional
from fastapi.encoders import jsonable_encoder
@routers.put("/reset", tags=common_tags)
 
async def reset(new_password: PasswordReset, token: str):
    # 1. Decoding the token
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = decoded_token.get("email")
        print(f"Decoded Email: {email}")
    except Exception as e:
        print(f"Error decoding token: {e}")
        raise HTTPException(status_code=400, detail="Invalid token")
    
    # 2. Fetch the user from the database
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM utilisateur WHERE email=?", (email,))
    user = cursor.fetchone()
    print(f"User from DB: {user}")

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 3. Update the password
    hashed_password = Hash.bcrypt(new_password.password)
    print(f"Hashed Password: {hashed_password}")

    query = "UPDATE utilisateur SET hashed_password=? WHERE email=?"
    params = (hashed_password, email)
    
    cursor.execute(query, params)
    db_connection.commit()
    
    row_count = cursor.rowcount
    print(f"Number of Rows Updated: {row_count}")

    if row_count  := 0:
        raise HTTPException(status_code=400, detail="Failed to update password")

    return {"message": "Password has changed successfully"}
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"  # Update this with your secret key
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def decode_access_token(token: str = Depends(oauth2_scheme)) -> Optional[str]:
     
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
