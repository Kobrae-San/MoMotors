from shared.models.user import UserModel
from shared.utils.database import Database

def select_user_is_admin(user_id: int):
    query = """
                SELECT is_admin FROM "user"
                WHERE id = %s

            """
    params = (user_id,)

    return Database.query(query, params)