from pydantic import BaseModel
from typing import Optional, Literal


class VehicleModel(BaseModel):
    id: Optional[int] = None
    model: str
    year: int
    km: int
    type: Literal["location", "buy"]
    price: float
    brand: Literal["Renault","Peugeot","Dacia","Citroën","Volkswagen","Toyota","Tesla","BMW","Mercedes","Ford","Audi","Hyundai","Kia","Opel","Fiat","Škoda","Nissan","MG","Mini","DS","Suzuki","Seat","Volvo","Cupra","Jeep","Land Rover","Lexus","Alfa Romeo","Porsche","Lynk & Co","Alpine","Mitsubishi","Smart","Jaguar","Abarth","Maserati","Lotus","Lamborghini","Bentley","Rolls Royce","Mobilize","Bugatti"]
    energy: Literal["electric", "diesel", "petrol"]
    category: Literal["suv","sedan","hatchback","city_car","convertible","coupe","station_wagon","minivan","pickup","roadster","off_road","supercar","hypercar"]
    description: str