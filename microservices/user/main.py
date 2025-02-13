from typing import Union
from fastapi import FastAPI
from shared.utils.database import Database

app = FastAPI()

db = Database()  # Instanciation de la classe Database

@app.get("/")
def read_root():
    result = db.query("SELECT * FROM user;")  # Utilisation de l'instance db
    return {"Hello": "World!", "users": result}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
