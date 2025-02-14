from typing import Union
from repository import TransactionRepository

def read_root():
    return {"Hello":"Hello World from transaction !"}

def read_all_transaction():
    transactions = TransactionRepository.find_all()
    return {"data":transactions}

def read_transaction(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

def create_transaction(item_id: int, q: Union[str, None] = None):
    return {"message": "Transaction créée", "item_id": item_id, "q": q}
