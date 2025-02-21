from fastapi import APIRouter
from controllers.user_controller import create_user_controller, get_all_users_controller, login_controller
from shared.models.auth import Auth, UserRegistration

user_router = APIRouter()


@user_router.get("/users")
def get_all_users_route():
    return get_all_users_controller()


@user_router.post("/login")
def login_route(request: Auth):
    return login_controller(request)


@user_router.post("/register")
def register_route(request: UserRegistration):
    return create_user_controller(request)
