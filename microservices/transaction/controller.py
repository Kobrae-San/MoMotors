from typing import Union

def read_root():
    return {"Hello":"Hello World from transaction !"}

def read_transaction(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

def create_transaction(item_id: int, q: Union[str, None] = None):
    return {"message": "Transaction créée", "item_id": item_id, "q": q}
