import { Injectable } from "@angular/core";
import {
  VehicleBrand,
  VehicleCategory,
  VehicleEnergy,
  VehicleType,
} from "../enums/vehicle.enum";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public cars = [
    {
      id: 1,
      model: "Model Y",
      brand: VehicleBrand.Tesla,
      year: 2022,
      km: 15_000,
      price: 42_500,
      type: VehicleType.Sale,
      imageUrl:
        "https://images.pexels.com/photos/30306584/pexels-photo-30306584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      energy: VehicleEnergy.Electric,
      category: VehicleCategory.SUV,
      description:
        "Tesla Model Y, entièrement électrique, avec une autonomie de 500 km. En excellent état, peu de kilomètres parcourus.",
    },
    {
      id: 2,
      model: "208",
      brand: VehicleBrand.Peugeot,
      year: 2018,
      km: 5_000,
      price: 2_500,
      type: VehicleType.Rental,
      imageUrl:
        "https://images.pexels.com/photos/18471354/pexels-photo-18471354/free-photo-of-voiture-vehicule-parking-transport.jpeg",
    },
    {
      id: 3,
      model: "500",
      brand: VehicleBrand.Fiat,
      year: 2020,
      km: 7_000,
      price: 12_500,
      type: VehicleType.Rental,
      imageUrl:
        "https://images.pexels.com/photos/2989652/pexels-photo-2989652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 1,
      model: "Model Y",
      brand: VehicleBrand.Tesla,
      year: 2022,
      km: 15_000,
      price: 42_500,
      type: VehicleType.Sale,
      imageUrl:
        "https://images.pexels.com/photos/30306584/pexels-photo-30306584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      model: "208",
      brand: VehicleBrand.Peugeot,
      year: 2018,
      km: 5_000,
      price: 2_500,
      type: VehicleType.Rental,
      imageUrl:
        "https://images.pexels.com/photos/18471354/pexels-photo-18471354/free-photo-of-voiture-vehicule-parking-transport.jpeg",
    },
    {
      id: 3,
      model: "500",
      brand: VehicleBrand.Fiat,
      year: 2020,
      km: 7_000,
      price: 12_500,
      type: VehicleType.Rental,
      imageUrl:
        "https://images.pexels.com/photos/2989652/pexels-photo-2989652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  constructor() {}

  public getAll() {
    return this.cars;
  }
}
