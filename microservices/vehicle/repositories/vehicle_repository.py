from shared.models.vehicle import VehicleModel
from shared.utils.database import Database

def insert_vehicle(vehicle_model = VehicleModel):
    query = """
                INSERT INTO vehicle (model, year, km, type, price, brand, energy, category, description) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, model, year, km, type, price, brand, energy, category, description
            """
    params = (
                vehicle_model.model, 
                vehicle_model.year, 
                vehicle_model.km, 
                vehicle_model.type, 
                vehicle_model.price, 
                vehicle_model.brand, 
                vehicle_model.energy, 
                vehicle_model.category, 
                vehicle_model.description,
            )
    return Database.query(query, params)

def select_vehicles():
    query = """
                SELECT id, model, year, km, type, price, brand, energy, category, description FROM vehicle
                ORDER BY created_at
            """

    return Database.query(query)

def select_vehicle_by_id(vehicle_id: int):
    query = """
                SELECT id, model, year, km, type, price, brand, energy, category, description FROM vehicle
                WHERE id = %s
            """
    params = (vehicle_id,)

    return Database.query(query, params)

def update_vehicle_by_id(vehicle_id: int, vehicle_model: VehicleModel):
    query = """
                UPDATE vehicle
                SET model = %s, year = %s, km = %s, type = %s, price =%s, brand =%s, energy = %s, category = %s, description = %s
                WHERE id = %s
                RETURNING id, model, year, km, type, price, brand, energy, category, description
            """
    params = (
                vehicle_model.model, 
                vehicle_model.year, 
                vehicle_model.km, 
                vehicle_model.type, 
                vehicle_model.price, 
                vehicle_model.brand, 
                vehicle_model.energy, 
                vehicle_model.category, 
                vehicle_model.description,
                vehicle_id,
            )
    return Database.query(query, params)

def delete_vehicle_by_id(vehicle_id: int):
    query = """
                DELETE FROM vehicle
                WHERE id = %s
            """
    
    params = (vehicle_id,)

    return Database.query(query, params)

