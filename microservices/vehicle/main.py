from typing import Union
from routes.vehicle_router import vehicle_router
from shared.utils.app_config import app_config
from shared.utils.error_handler import add_error_handlers

app = app_config()

app.include_router(vehicle_router)

add_error_handlers(app)
