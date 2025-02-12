import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public cars = [
    { id: 1, brand: "Tesla", model: "Model 3", price: 50000, available: true },
    { id: 2, brand: "BMW", model: "X5", price: 60000, available: false },
  ];

  constructor() {}

  public getAll() {
    return this.cars;
  }
}
