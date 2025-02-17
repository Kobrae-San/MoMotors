from repository import fetch_transactions

def get_transactions():
    results = fetch_transactions()
    return {"success": True, "data": results}
