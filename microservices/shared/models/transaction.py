from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, Literal

class TransactionModel(BaseModel):
    id: Optional[int] = None
    id_vehicle: Optional[int] = None
    id_user: Optional[int] = None
    status: Literal['En attente', 'Validé', 'Refusé']
    id_admin: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    validated_at: Optional[datetime] = None
    start_time: Optional[date] = None
    end_time: Optional[date] = None
