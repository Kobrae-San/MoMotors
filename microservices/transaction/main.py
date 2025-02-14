from fastapi import FastAPI
from router import router
from shared.utils.app_config import app_config
from shared.utils.error_handler import add_error_handlers

app = app_config()

app.include_router(router)

add_error_handlers(app)