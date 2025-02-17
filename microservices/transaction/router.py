from fastapi import APIRouter
from controller import get_transactions

router = APIRouter()

@router.get("/")
def transactions():
    return get_transactions()
