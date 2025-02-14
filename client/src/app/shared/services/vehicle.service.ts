import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public cars = [
    {
      model: "Model Y",
      brand: "Tesla",
      year: 2022,
      km: 15_000,
      price: 42_500,
      type: "vente",
      imageUrl:
        "https://images.pexels.com/photos/30306584/pexels-photo-30306584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  constructor() {}

  public getAll() {
    return this.cars;
  }
}
