from shared.utils.database import Database
from shared.models.auth import UserRegistration

def insert_user(user_data: UserRegistration):
    query = """
        INSERT INTO "user" (email, password, firstname, lastname, telephone)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, email, firstname, lastname, telephone
    """
    params = (
        user_data.email,
        user_data.password,
        user_data.firstName,
        user_data.lastName,
        user_data.phone
    )
    return Database.query(query, params)

def select_all_users():
    query = """
        SELECT id, email, firstname, lastname, telephone 
        FROM "user"
        ORDER BY created_at
    """
    return Database.query(query)