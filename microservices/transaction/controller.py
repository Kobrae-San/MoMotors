from repository import fetch_transactions

def get_transactions():
    return {"success": True, "data": fetch_transactions()}
