from repository import fetch_transactions, create_transaction
from typing import Union

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def create(transaction):
    created_transaction = create_transaction(transaction)

    if created_transaction is not None:
        return {"message": "Transaction créée", "transaction_id": created_transaction}
    else:
        return {"message": "Échec de la création de la transaction"}