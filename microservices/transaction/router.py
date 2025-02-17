from fastapi import APIRouter, Form, HTTPException
from pydantic import ValidationError
from typing import Union, Optional
from controller import get_transactions, patch_transaction_status, create
from shared.models.transaction import TransactionModel

router = APIRouter()

@router.get("/")
def transactions():
    return get_transactions()

@router.patch("/{id}")
def transaction_status(id: int, transaction: TransactionModel): #Route admin
    return patch_transaction_status(id, transaction.status)

@router.post("/create")
async def post_transaction(transaction: TransactionModel):
    try:
        return create(transaction)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
