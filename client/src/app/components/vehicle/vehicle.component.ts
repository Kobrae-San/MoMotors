import { Component, inject, input } from "@angular/core";
import { Button } from "primeng/button";
import { Card } from "primeng/card";
import {
  VehicleBrand,
  VehicleCategory,
  VehicleEnergy,
  VehicleType,
} from "../../shared/enums/vehicle.enum";
import { CurrencyPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-vehicle",
  standalone: true,
  imports: [Card, Button, CurrencyPipe],
  templateUrl: "./vehicle.component.html",
  styleUrl: "./vehicle.component.scss",
})
export class VehicleComponent {
  private router = inject(Router);

  id = input<number>();
  model = input<string>();
  brand = input<VehicleBrand>();
  year = input<number>();
  km = input<number>();
  price = input<number>();
  type = input<VehicleType>();
  imageUrl = input<string>();
  energy = input<VehicleEnergy>();
  category = input<VehicleCategory>();
  description = input<string>();

  vehicleType = VehicleType;

  goToDetails() {
    this.router.navigate(["/vehicle-details", this.id()], {
      state: { vehicle: this.getVehicleData() },
    });
  }

  private getVehicleData() {
    return {
      id: this.id(),
      model: this.model(),
      brand: this.brand(),
      year: this.year(),
      km: this.km(),
      price: this.price(),
      type: this.type(),
      imageUrl: this.imageUrl(),
      energy: this.energy(),
      category: this.category(),
      description: this.description(),
    };
  }
}
