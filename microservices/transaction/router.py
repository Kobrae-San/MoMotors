from fastapi import APIRouter
from controller import get_transactions, patch_transaction_status
from shared.models.transaction import TransactionModel

router = APIRouter()

@router.get("/")
def transactions():
    return get_transactions()

@router.patch("/{id}")
def transaction_status(id: int, transaction: TransactionModel): #Route admin
    return patch_transaction_status(id, transaction.status)