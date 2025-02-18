from fastapi import APIRouter, Form, HTTPException
from pydantic import ValidationError
from typing import Union, Optional
from controller import delete, get_transactions, update, create
from shared.models.transaction import TransactionModel

router = APIRouter()

@router.get("/")
def transactions():
    return get_transactions()

@router.patch("/{id}")
def transaction_status(id: int, transaction: TransactionModel): #Route admin
    return update(id, transaction.status)

@router.post("/create")
async def post_transaction(transaction: TransactionModel):
    return create(transaction)

@router.delete("/{id}")
async def delete_transaction(id: int):
    return delete(id)