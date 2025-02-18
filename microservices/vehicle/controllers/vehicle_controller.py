from fastapi import HTTPException
from services.vehicle_service import create_vehicle_service, get_all_vehicles_service, update_vehicle_service, delete_vehicle_service
from shared.models.vehicle import VehicleModel

# def create_vehicle_controller(user_id: int, vehicle_model: VehicleModel):
#     return { "success": True,  "data": create_vehicle_service(user_id, vehicle_model)}

def get_all_vehicles_controller():
    return {"success": True, "data": get_all_vehicles_service()}

# def update_vehicle_controller(user_id: int, vehicle_id: int, vehicle_model: VehicleModel):
#     return { "success": True, "data": update_vehicle_service(user_id, vehicle_id, vehicle_model)}

# def delete_vehicle_controller(user_id: int, vehicle_id: int ):
#     response = delete_vehicle_service(user_id, vehicle_id)
#     if response:
#         return { "sucess" : True, "message": response["message"] }
#     else:
#         return { "sucess" : True, "message": "Vehicle sucessfully deleted" }
