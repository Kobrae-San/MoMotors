from typing import Union
from fastapi import FastAPI

from shared.utils.auth import Auth, authenticate
from shared.utils.database import Database

app = FastAPI()

db = Database()

@app.get("/")
def read_root():
    result = db.query('SELECT * FROM "user";')
    return {"Hello": "World!", "users": result}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/login")
def login(request: Auth):
    token = authenticate(request.username, request.password, request.new_password)
    return {"access_token": token}