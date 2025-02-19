from repository import fetch_transactions, update_transaction_status, create_transaction, delete_transaction, fetch_transactions_by_id
from generatepdf import generate_pdf

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def update(id: int, status: str): #Route admin
    update_transaction_status(id, status)
    return {"success": True, "message": f"Transaction status updated to {status}"}

def create(transaction):
    created_transaction = create_transaction(transaction)
    results = fetch_transactions_by_id(created_transaction)
    generate_transaction_pdf = generate_pdf(results[0])
    return {"success": True, "message": f"Transaction ID is created : {created_transaction}"}

def delete(id):
    delete_transaction(id)
    return {"success": True, "message": f"Transaction is deleted"}
    