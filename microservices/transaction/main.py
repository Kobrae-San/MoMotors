from typing import Union
from fastapi import FastAPI
from controller import read_root, read_transaction, create_transaction

app = FastAPI()

@app.get("/")
def root():
    return read_root() 

@app.get("/transaction/{item_id}")
def get_transaction(item_id: int, q: Union[str, None] = None):
    return read_transaction(item_id, q)


@app.post("/transaction/create")
def post_transaction(item_id: int, q: Union[str, None] = None):
    return create_transaction(item_id, q)