from repositories.vehicle_repository import insert_vehicle, select_vehicles, update_vehicle_by_id, delete_vehicle_by_id
from shared.models.vehicle import VehicleModel
from typing import List

def create_vehicle_service(vehicle_model: VehicleModel):
    return insert_vehicle(vehicle_model)

def get_all_vehicles_service():
    return select_vehicles()

def update_vehicle_service(vehicle_id, vehicle_model = VehicleModel):
    return update_vehicle_by_id(vehicle_id, vehicle_model)


def delete_vehicle_service(vehicle_id):
    return delete_vehicle_by_id(vehicle_id)
