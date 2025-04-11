from repositories.vehicle_repository import insert_vehicle, select_vehicles, select_vehicle_by_id, update_vehicle_by_id, delete_vehicle_by_id
from repositories.user_repository import select_user_is_admin
from shared.models.vehicle import VehicleModel
from typing import List
from fastapi import File, UploadFile
from shared.utils.bucket import Bucket

def create_vehicle_service(user_id : int, vehicle_model: VehicleModel):
    is_user_admin = select_user_is_admin(user_id)
    if is_user_admin:
        if is_user_admin[0]["is_admin"]:
            return insert_vehicle(vehicle_model)
    else:
            return { "message" : "No such user"}
    return { "message" : "Access Denied"}

async def add_vehicle_pictures_service(user_id: int, vehicle_id: int, files: List[UploadFile]):
    is_user_admin = select_user_is_admin(user_id)
    does_vehicle_exist = select_vehicle_by_id(vehicle_id)
    if is_user_admin:
        if is_user_admin[0]["is_admin"] and does_vehicle_exist:
            uploaded_files = []
            for file in files:
                content = await file.read()
                file_name = f"{file.filename}"
                Bucket.write("vehicles/",content, file_name)
                uploaded_files.append(file_name)
            return {"uploaded": uploaded_files}
        elif not does_vehicle_exist:
            return { "message" : "No such vehicle"}
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
