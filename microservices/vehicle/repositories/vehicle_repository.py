from shared.models.vehicle import VehicleModel
from shared.utils.database import Database

class VehicleRepository:
    def __init__(self, db: Database):
        self.db = db

    def _create(self, vehicle_model = VehicleModel):
        return self.db.query(f"INSERT INTO vehicle VALUES model, year, km, type, price, brand, energy, category, description", [vehicle_model.model, vehicle_model.year, vehicle_model.km, vehicle_model.type, vehicle_model.price, vehicle_model.brand, vehicle_model.energy, vehicle_model.category, vehicle_model.description])
    
    def get_vehicles(self):
        print(self.db.query("SELECT * FROM vehicle"))
        return self.db.query("SELECT * FROM vehicle")
        # return "GodDamn !"