from fastapi import HTTPException
from services.vehicle_service import VehicleService
from shared.models.vehicle import VehicleModel

class VehicleController:
    def __init__(self, service: VehicleService):
        self.service = service

    async def create_vehicle(self, vehicle_model: VehicleModel):
        try:
            return self.service.create_vehicle(vehicle_model)
        except:
            raise HTTPException(400, "Error while adding vehicle.")

    async def get_all_vehicles(self):
        try:
            return self.service.get_all_vehicles()
        except:
            raise HTTPException(400, "Error while retrieving vehicle.")
