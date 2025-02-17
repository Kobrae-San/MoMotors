from repository import fetch_transactions, update_transaction_status

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def patch_transaction_status(id: int, status: str): #Route admin
    update_transaction_status(id, status)
    return {"success": True, "message": f"Transaction status updated to {status}"}