import { Component, OnInit } from "@angular/core";
import { Card } from "primeng/card";
import { Button } from "primeng/button";
import { VehicleService } from "../../shared/services/vehicle.service";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-vehicle",
  imports: [Card, Button, CurrencyPipe],
  templateUrl: "./vehicle.component.html",
  styleUrl: "./vehicle.component.scss",
})
export class VehicleComponent implements OnInit {
  public cars: any[] = [];
  public car: any;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.cars = this.vehicleService.getAll();
    console.log(this.cars);
    this.car = this.cars[0];
  }
}
