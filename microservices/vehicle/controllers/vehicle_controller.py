from fastapi import HTTPException,  File, UploadFile
from typing import List
from services.vehicle_service import create_vehicle_service, get_all_vehicles_service, get_vehicle_by_id_service, update_vehicle_service, delete_vehicle_service, add_vehicle_pictures_service
from shared.models.vehicle import VehicleModel

def create_vehicle_controller(user_id: int, vehicle_model: VehicleModel):
    return { "success": True,  "data": create_vehicle_service(user_id, vehicle_model)}

async def add_vehicle_pictures_controller(user_id: int, vehicle_id: int, files: List[UploadFile]):
    return await add_vehicle_pictures_service(user_id, vehicle_id, files)


def get_all_vehicles_controller():
    return {"success": True, "data": get_all_vehicles_service()}

def get_vehicle_by_id_controller(vehicle_id: int):
    return {"success": True, "data": get_vehicle_by_id_service(vehicle_id)}

def update_vehicle_controller(user_id: int, vehicle_id: int, vehicle_model: VehicleModel):
    return { "success": True, "data": update_vehicle_service(user_id, vehicle_id, vehicle_model)}

def delete_vehicle_controller(user_id: int, vehicle_id: int ):
    response = delete_vehicle_service(user_id, vehicle_id)
    if response:
        return { "sucess" : True, "message": response["message"] }
    else:
        return { "sucess" : True, "message": "Vehicle sucessfully deleted" }
