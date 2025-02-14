from fastapi import APIRouter
from typing import List
from shared.models.vehicle import VehicleModel
from controllers.vehicle_controller import VehicleController

# vehicle_router = APIRouter()

# @vehicle_router.get("/vehicle/")
# async def get_all_vehicle():
#     return [{"Model" : "Yatout Yatout"}]

# @vehicle_router.get("/vehicle/{item_id}")
# async def get_vehicle_by_id(item_id: int):
#     return [{"Model" : "F-150"}, {"Item_id" : f"{item_id}"}]

# @vehicle_router.get("/")


class VehicleRouter:
    def __init__(self, vehicle_controller = VehicleController):
        self.router = APIRouter(prefix="/vehicle", tags=["vehicle"])
        self.controller = vehicle_controller
        self._setup_routes()

    def _setup_routes(self):
        print("yop router")
        self.router.get("/")(self.controller.get_all_vehicles)
        self.router.post("/create", response_model=VehicleModel)(self.controller.create_vehicle)
        # self.router.put("/update", response_model=VehicleModel)(self.controller.update_vehicle)

    def get_router(self) -> APIRouter:
        return self.router