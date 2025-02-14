from typing import Union
from shared.models.transaction import TransactionModel
from repository import TransactionRepository

def read_root():
    return {"Hello":"Hello World from transaction !"}

def read_all_transaction():
    transactions = TransactionRepository.find_all()
    return {"data":transactions}

def read_transaction(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


def create_transaction(transaction):
    created_transaction = TransactionRepository.create(transaction)

    if created_transaction is not None:
        return {"message": "Transaction créée", "transaction_id": created_transaction.id}
    else:
        return {"message": "Échec de la création de la transaction"}

