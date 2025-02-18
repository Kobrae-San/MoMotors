from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserModel(BaseModel):
    id: Optional[int] = None
    is_admin: bool
    password: str
    firstname: str
    lastname: str
    email: str
    updated_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

