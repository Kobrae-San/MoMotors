from fastapi import APIRouter
from typing import List
from shared.models.vehicle import VehicleModel
from controllers.vehicle_controller import create_vehicle_controller, get_all_vehicles_controller, get_vehicle_by_id_controller, update_vehicle_controller, delete_vehicle_controller

vehicle_router = APIRouter()

@vehicle_router.get("/vehicles")
def get_all_vehicles_route():
    return get_all_vehicles_controller()

@vehicle_router.get("/vehicle/{vehicle_id}")
def get_vehicle_by_id_route(vehicle_id: int):
    return get_vehicle_by_id_controller(vehicle_id)

@vehicle_router.post("/vehicle/create/{user_id}")
def create_vehicle_route(user_id, vehicle_model: VehicleModel):
    return create_vehicle_controller(user_id, vehicle_model)

@vehicle_router.put("/vehicle/{vehicle_id}/update/{user_id}")
def update_vehicle_route(user_id: int, vehicle_id: int, vehicle_model: VehicleModel):
    return update_vehicle_controller(user_id, vehicle_id, vehicle_model)

@vehicle_router.delete("/vehicle/{vehicle_id}/delete/{user_id}")
def delete_vehicle_route(user_id: int, vehicle_id: int):
    return delete_vehicle_controller(user_id, vehicle_id)
