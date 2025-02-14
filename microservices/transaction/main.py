from typing import Union, Optional
from pydantic import ValidationError
from fastapi import FastAPI, Form, HTTPException  
from controller import read_transaction, read_all_transaction, read_root, create_transaction
from shared.models.transaction import TransactionModel
from datetime import datetime, date 

app = FastAPI()

@app.get("/")
def root():
    return read_root()

@app.get("/transaction/all")
def get_transaction():
    return read_all_transaction()

@app.post("/transaction/create")
async def post_transaction(
    id_vehicle: Union[int, None] = Form(None),
    id_user: Union[int, None] = Form(None),
    status: str = Form(...),
    id_admin: Union[int, None] = Form(None),
    validated_at: Optional[str] = Form(None),
    start_time: Union[str, None] = Form(None),
    end_time: Union[str, None] = Form(None)
):
    try:

        # Si validated_at est une chaîne vide ou 'None', on le considère comme None
        if validated_at == "None" or validated_at == "":
            validated_at = None
        elif validated_at:
            try:
                # Convertir la chaîne en datetime
                validated_at = datetime.fromisoformat(validated_at)
            except ValueError:
                raise HTTPException(status_code=400, detail="validated_at must be a valid datetime string")
        
        transaction = TransactionModel(
            id_vehicle=id_vehicle,
            id_user=id_user,
            status=status,
            id_admin=id_admin,
            validated_at=validated_at,
            start_time=start_time,
            end_time=end_time
        )

        return create_transaction(transaction)

    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Format de date invalide")

# @app.get("/transaction/{item_id}")
# def get_transaction(item_id: int, q: Union[str, None] = None):
#     return read_transaction(item_id, q)