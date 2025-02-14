from fastapi import APIRouter, Form, HTTPException
from pydantic import ValidationError
from typing import Union, Optional
from controller import get_transactions, patch_transaction_status, create
from shared.models.transaction import TransactionModel
from datetime import datetime, date

router = APIRouter()

@router.get("/")
def transactions():
    return get_transactions()

@router.patch("/{id}")
def transaction_status(id: int, transaction: TransactionModel): #Route admin
    return patch_transaction_status(id, transaction.status)

@router.post("/create")
async def post_transaction(
    id_vehicle: Union[int, None] = Form(None),
    id_user: Union[int, None] = Form(None),
    status: str = Form(...),
    id_admin: Union[int, None] = Form(None),
    # validated_at: Optional[str] = Form(None),
    validated_at: Union[str, None] = Form(None),
    start_time: Union[str, None] = Form(None),
    end_time: Union[str, None] = Form(None)
):
    try:
        transaction = TransactionModel(
            id_vehicle=id_vehicle,
            id_user=id_user,
            status=status,
            id_admin=id_admin,
            validated_at=validated_at,
            start_time=start_time,
            end_time=end_time
        )

        return create(transaction)

    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Format de date invalide")