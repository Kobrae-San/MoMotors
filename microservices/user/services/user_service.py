import logging
from repositories.user_repository import insert_user, select_all_users
from shared.models.auth import UserRegistration
from shared.utils.cognito_client import authenticate_cognito, create_user_cognito

logger = logging.getLogger(__name__)


def get_all_users_service():
    return select_all_users()


def authenticate_service(username: str, password: str):
    try:
        return authenticate_cognito(username, password)
    except Exception as err:
        logger.error(f"Erreur lors de l'authentification: {err}")
        raise err


def create_user_service(user_data: UserRegistration):
    try:

        user_sub = create_user_cognito(
            username=user_data.username,
            password=user_data.password
        )

        db_user = insert_user(user_data)

        return {
            "cognito_id": user_sub,
            "user_data": db_user
        }
    except Exception as err:
        logger.error(f"Erreur lors de la création de l'utilisateur: {err}")
        raise err