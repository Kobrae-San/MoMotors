from fastapi import HTTPException
from services.vehicle_service import create_vehicle_service, get_all_vehicles_service, update_vehicle_service, delete_vehicle_service
from shared.models.vehicle import VehicleModel

def create_vehicle_controller(vehicle_model: VehicleModel):
    return { "success": True,  "data": create_vehicle_service(vehicle_model)}

def get_all_vehicles_controller():
    return {"success": True, "data": get_all_vehicles_service()}

def update_vehicle_controller(vehicle_id: int, vehicle_model: VehicleModel):
    return { "success": True, "data": update_vehicle_service(vehicle_id, vehicle_model)}

def delete_vehicle_controller(vehicle_id: int):
    delete_vehicle_service(vehicle_id)
    return { "sucess" : True, "message": "Vehicle sucessfully deleted" }
