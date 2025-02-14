from typing import Union
from fastapi import FastAPI
from routes.vehicle_router import VehicleRouter
from controllers.vehicle_controller import VehicleController
from services.vehicle_service import VehicleService
from repositories.vehicle_repository import VehicleRepository
from shared.utils.database import Database


def create_app() -> FastAPI:
    
    db = Database()

    db._connect()
    app = FastAPI()

    vehicle_repository = VehicleRepository(db)
    vehicle_service = VehicleService(vehicle_repository)
    vehicle_controller = VehicleController(vehicle_service)
    vehicle_router = VehicleRouter(vehicle_controller)

    app.include_router(vehicle_router.get_router())
    
    return app

app = create_app()

# @app.get("/")
# def read_root():
#     return {"Hello": "World! vehicle"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}