from typing import Union
from fastapi import FastAPI
from shared.utils.database import Database

app = FastAPI()


@app.get("/")
def read_root():
    Database.query("SELECT * FROM user;")
    return {"Hello": "World! user"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
