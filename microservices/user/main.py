from typing import Union
from fastapi import FastAPI
from shared.utils.app_config import app_config
from shared.utils.auth import Auth, authenticate, UserRegistration, create_user
from shared.utils.database import Database

from shared.utils.auth import logger

app = app_config()

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
    token = authenticate(request.username, request.password)
    return {"access_token": token}

@app.post("/register")
def register(request: UserRegistration):
    print(request)
    create_user(
        username=request.username,
        password=request.password
    )
    try:
        db.query(
            'INSERT INTO "user" (email, password, firstname, lastname, telephone) VALUES (%s, %s, %s, %s, %s);',[
            request.email,
            request.password,
            request.firstName,
            request.lastName,
            request.phone])

    except Exception as err:
        logger.error(f"Erreur lors de la création de l'utilisateur: {err}")

    return {"message": "Utilisateur créé avec succès"}