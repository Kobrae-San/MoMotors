from repository import fetch_transactions, update_transaction_status, create_transaction, delete_transaction

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def update(id: int, status: str): #Route admin
    update_transaction_status(id, status)
    return {"success": True, "message": f"Transaction status updated to {status}"}

def create(transaction):
    created_transaction = create_transaction(transaction)
    return {"success": True, "message": f"Transaction ID is created : {created_transaction}"}

def delete(id):
    delete_transaction(id)
    return {"success": True, "message": f"Transaction is deleted"}
    