from repositories.vehicle_repository import VehicleRepository
from shared.models.vehicle import VehicleModel
from typing import List

class VehicleService:
    def __init__(self, repository: VehicleRepository):
        self.repository = repository

    def create_vehicle(self, vehicle_model: VehicleModel):
        created_vehicle = self.repository._create(vehicle_model)
        new_vehicle = VehicleModel(
            id = created_vehicle[0],
            model = created_vehicle[1], 
            year = created_vehicle[2], 
            km = created_vehicle[3], 
            type = created_vehicle[4], 
            price = created_vehicle[5], 
            brand = created_vehicle[6], 
            energy = created_vehicle[7], 
            category = created_vehicle[8], 
            description = created_vehicle[9]
        )
        return new_vehicle
    
    def get_all_vehicles(self):
        vehicle_tuple_list = self.repository.get_vehicles()
        vehicle_list: List[VehicleModel] = []
        for vehicle in vehicle_tuple_list:
            new_vehicle = VehicleModel(
                id = vehicle[0],
                model = vehicle[1], 
                year = vehicle[2], 
                km = vehicle[3], 
                type = vehicle[4], 
                price = vehicle[5], 
                brand = vehicle[6], 
                energy = vehicle[7], 
                category = vehicle[8], 
                description = vehicle[9]
            )
            vehicle_list.append(new_vehicle)
        return vehicle_list