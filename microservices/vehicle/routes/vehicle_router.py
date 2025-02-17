from fastapi import APIRouter
from typing import List
from shared.models.vehicle import VehicleModel
from controllers.vehicle_controller import create_vehicle_controller, get_all_vehicles_controller, update_vehicle_controller, delete_vehicle_controller

vehicle_router = APIRouter()

@vehicle_router.get("/vehicle")
def get_all_vehicles_route():
    return get_all_vehicles_controller()

@vehicle_router.post("/vehicle/create")
def create_vehicle_route(vehicle_model: VehicleModel):
    return create_vehicle_controller(vehicle_model)

@vehicle_router.put("/vehicle/update/{vehicle_id}")
def update_vehicle_route(vehicle_id: int, vehicle_model: VehicleModel):
    return update_vehicle_controller(vehicle_id, vehicle_model)

@vehicle_router.delete("/vehicle/delete/{vehicle_id}")
def delete_vehicle_route(vehicle_id: int):
    return delete_vehicle_controller(vehicle_id)