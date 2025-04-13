from services.user_service import create_user_service, get_all_users_service, authenticate_service
from shared.models.auth import Auth, UserRegistration


def get_all_users_controller():
    return {"success": True, "data": get_all_users_service()}


def login_controller(auth_request: Auth):
    token = authenticate_service(auth_request.username, auth_request.password)
    return {"success": True, "data": {"access_token": token}}


def create_user_controller(user_request: UserRegistration):
    try:
        result = create_user_service(user_request)
        return {"success": True, "data": result, "message": "Utilisateur créé avec succès"}
    except Exception as e:
        return {"success": False, "message": str(e)}
