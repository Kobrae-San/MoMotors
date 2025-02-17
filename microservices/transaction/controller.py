from repository import fetch_transactions

def get_transactions():
    return {"data": fetch_transactions()}
