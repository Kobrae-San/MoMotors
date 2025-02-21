from typing import Union
from pydantic import BaseModel


class Auth(BaseModel):
    username: str
    password: str
    new_password: Union[str, None] = None


class UserRegistration(BaseModel):
    username: str
    email: str
    password: str
    firstName: str
    lastName: str
    phone: str
