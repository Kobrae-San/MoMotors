from repository import fetch_transactions, update_transaction_status, create_transaction, delete_transaction, fetch_transactions_by_id
from generatepdf import generate_pdf
from shared.utils.bucket import Bucket

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}

def update(id: int, status: str): #Route admin
    update_transaction_status(id, status)
    results = fetch_transactions_by_id(id)
    transaction_pdf_bytes = generate_pdf(results[0]) # update pdf for S3
    Bucket.write("transaction-folders/", transaction_pdf_bytes , f"{id}_transaction.pdf")
    return {"success": True, "message": f"Transaction status updated to {status}"}

def create(transaction):
    created_transaction = create_transaction(transaction)
    results = fetch_transactions_by_id(created_transaction)
    transaction_pdf_bytes  = generate_pdf(results[0])
    Bucket.write("transaction-folders/", transaction_pdf_bytes, f"{created_transaction}_transaction.pdf")
    return {"success": True, "message": f"Transaction ID is created : {created_transaction}"}

def delete(id):
    delete_transaction(id)
    return {"success": True, "message": f"Transaction is deleted"}
    