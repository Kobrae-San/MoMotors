from pydantic import BaseModel
from typing import Optional, Literal


class VehicleModel(BaseModel):
    id: Optional[int] = None
    model: str
    year: int
    km: int
    type: Literal['Vente', 'Location']
    price: float
    brand: Literal['Renault', 'Peugeot', 'Dacia', 'Citroën', 'Volkswagen', 'Toyota', 'Tesla', 'BMW', 'Mercedes', 'Ford', 'Audi', 'Hyundai', 'Kia', 'Opel', 'Fiat', 'Škoda', 'Nissan', 'MG', 'Mini', 'DS', 'Suzuki', 'Seat', 'Volvo', 'Cupra', 'Jeep', 'Land Rover', 'Lexus', 'Alfa Romeo', 'Porsche', 'Lynk & Co', 'Alpine', 'Mitsubishi', 'Smart', 'Jaguar', 'Abarth', 'Maserati', 'Lotus', 'Lamborghini', 'Bentley', 'Rolls Royce', 'Mobilize', 'Bugatti']
    energy: Literal['Electrique', 'Diesel', 'Hybride', 'Essence']
    category: Literal['SUV', 'Berline', 'Compacte', 'Citadine', 'Cabriolet', 'Coupé', 'Break', 'Monospace', 'Pick-up', 'Roadster', 'Tout-terrain', 'Supercar', 'Hypercar', '2 Roues']
    description: str