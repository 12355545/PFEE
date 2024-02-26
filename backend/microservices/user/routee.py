from fastapi.params import Depends
from typing import List, Optional
from datetime import date, time, datetime
from fastapi.responses import FileResponse
from datetime import date, datetime

from .database import get_db
from fastapi import FastAPI, File, UploadFile, Path
import shutil
from pathlib import Path
from microservices.shared import models,schemas
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from microservices.shared.models import Todo
from microservices.authentication.routes import decode_access_token
routee = APIRouter()

class Profil(BaseModel):
    full_name: str
    email: str
    role_name: str

@routee.get("/Users/{id}", tags=["user"], response_model=Profil)
def read_users(id: int, token: str = Depends(decode_access_token), db: Session = Depends(get_db)):
    # Assuming there's a relationship between User and Role through an association table
    result = db.query(models.User.full_name, models.User.email, models.Role.name) \
        .join(models.User.roles) \
        .filter(models.User.id == id) \
        .first()
    if result:
        full_name, email, role_name = result
        return Profil(full_name=full_name, email=email, role_name=role_name)
    else:
        return {"error": "User not found"}
    
@routee.post("/uploadFS/{id}")
async def upload_image_fs(id: int, images: UploadFile = File(...),token: str = Depends(decode_access_token)):
    image_path = Path(f"{str(Path.home())}/Pictures/Saved Pictures/{id}.jpg")
    image_path.parent.mkdir(parents=True, exist_ok=True)

    with image_path.open("wb") as buffer:
        shutil.copyfileobj(images.file, buffer)

    return {"filename": f"{id}.jpg", "message": "File uploaded successfully"}


@routee.get("/getImage/{id}")
async def get_image(id: int):
    image_path = Path(f"{str(Path.home())}/Pictures/Saved Pictures/{id}.jpg")
    if image_path.is_file():
        return FileResponse(image_path)
    else:
        raise HTTPException(status_code=404, detail="Image not found")
    

class TodoDBIn(BaseModel):
    title: str
    description: Optional[str] = None
    time: str
    


@routee.post("/todo/", tags=["user"])
def create_todo(todo: TodoDBIn, db: Session = Depends(get_db), token: str = Depends(decode_access_token)):
    time_as_date = datetime.strptime(todo.time, '%Y-%m-%d').date() # Corrected here
    todo_item = Todo(
        title=todo.title,
        description=todo.description,
        time=time_as_date,
        completed=False,
        createdAt=datetime.now()
    )
    print(todo_item)
    db.add(todo_item)
    db.commit()
    db.refresh(todo_item)
    return True  # Convert SQLAlchemy model to Pydantic model






class TodoOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    time: date
    completed: bool
    createdAt: Optional[datetime] = None

class TodoList(BaseModel):
    todos: List[TodoOut]


@routee.get("/TODO",tags=["user"], response_model=TodoList)
def read_todos(db: Session = Depends(get_db),token: str = Depends(decode_access_token)):
    todos = db.query(Todo).all()
    todos_as_dict = [todo.__dict__ for todo in todos]

    # removing SQLAlchemy specific metadata
    for todo in todos_as_dict:
        todo.pop('_sa_instance_state', None)

    return TodoList(todos=todos_as_dict)

class TodOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    time: date
    
     

class TodList(BaseModel):
    todos: List[TodOut]


@routee.get("/TODO/{id}", tags=["user"], response_model=TodOut)
def read_todo_by_id(id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()

    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    # Remove SQLAlchemy specific metadata
    todo_dict = todo.__dict__
    todo_dict.pop('_sa_instance_state', None)
    
    return TodOut(**todo_dict)

@routee.delete("/todo/{id}",tags=["user"])
async def delete_todo(id: int, db: Session = Depends(get_db),token: str = Depends(decode_access_token)):
    todo_item = db.query(Todo).filter(Todo.id == id).first()
    if not todo_item:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo_item)
    db.commit()
    return {"message": "Todo has been deleted."}


@routee.put("/complete/{id}",tags=["user"])
async def complete_todo(id: int, db: Session = Depends(get_db),token: str = Depends(decode_access_token)):
    todo_item = db.query(Todo).filter(Todo.id == id).first()
    if not todo_item:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    todo_item.completed = True
    db.commit()

    return {"message": "Todo has been completed."}



class TodoUpdate(BaseModel):
    id: int
    title: Optional[str] = None
    description: Optional[str] = None
    time: Optional[date] = None  # changed this to date

@routee.put("/update/{id}", tags=["user"],response_model=TodoUpdate)
def update_todo(id: int, todo: TodoUpdate, db: Session = Depends(get_db),token: str = Depends(decode_access_token)):
    db_todo = db.query(Todo).filter(Todo.id == id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    update_data = todo.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_todo, key, value)

    db.commit()

    todo_update_dict = db_todo.__dict__.copy()
    todo_update_dict.pop('_sa_instance_state', None)  # remove extra SQLAlchemy attributes
    todo_update_dict["id"] = id  # add the 'id' back in

    return TodoUpdate(**todo_update_dict)
