from repositories.vehicle_repository import insert_vehicle, select_vehicles, select_vehicle_by_id, update_vehicle_by_id, delete_vehicle_by_id
from repositories.user_repository import select_user_is_admin
from shared.models.vehicle import VehicleModel
from typing import List

def create_vehicle_service(user_id : int, vehicle_model: VehicleModel):
    is_user_admin = select_user_is_admin(user_id)
    if is_user_admin:
        if is_user_admin[0]["is_admin"]:
            return insert_vehicle(vehicle_model)
    else:
            return { "message" : "No such user"}
    return { "message" : "Access Denied"}

def get_all_vehicles_service():
    return select_vehicles()

def get_vehicle_by_id_service(vehicle_id: int):
    return select_vehicle_by_id(vehicle_id)

def update_vehicle_service(user_id: int, vehicle_id: int, vehicle_model = VehicleModel):
    is_user_admin = select_user_is_admin(user_id)
    if is_user_admin:
        if is_user_admin[0]["is_admin"]:
            return update_vehicle_by_id(vehicle_id, vehicle_model)
        else:
            return { "message" : "No such user"}
    return { "message" : "Access Denied"}

def delete_vehicle_service(user_id: int, vehicle_id: int):
    is_user_admin = select_user_is_admin(user_id)
    if is_user_admin:
        if is_user_admin[0]["is_admin"]:
            return delete_vehicle_by_id(vehicle_id)
    else:
        return { "message" : "No such user"}
    return { "message" : "Access Denied"}
