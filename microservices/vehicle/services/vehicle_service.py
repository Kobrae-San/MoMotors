from repositories.vehicle_repository import VehicleRepository
from shared.models.vehicle import VehicleModel
from typing import List

class VehicleService:
    def __init__(self, repository: VehicleRepository):
        self.repository = repository

    def create_vehicle(self, vehicle_model: VehicleModel):
        return self.repository._create(vehicle_model)
    
    def get_all_vehicles(self):
        print("yop services")
        return self.repository.get_vehicles()