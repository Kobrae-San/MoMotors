from repository import fetch_transactions, update_transaction_status, create_transaction

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def patch_transaction_status(id: int, status: str): #Route admin
    update_transaction_status(id, status)
    return {"success": True, "message": f"Transaction status updated to {status}"}

def create(transaction):
    created_transaction = create_transaction(transaction)

    if created_transaction is not None:
        return {"message": "Transaction créée", "transaction_id": created_transaction}
    else:
        return {"message": "Échec de la création de la transaction"}
