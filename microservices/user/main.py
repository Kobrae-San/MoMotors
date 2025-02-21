from routes.user_router import user_router
from shared.utils.app_config import app_config
from shared.utils.error_handler import add_error_handlers

app = app_config()

app.include_router(user_router)

add_error_handlers(app)