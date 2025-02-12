import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../shared/services/vehicle.service";
import { Card } from "primeng/card";
import { NgClass } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { ButtonDirective, ButtonLabel } from "primeng/button";

@Component({
  selector: "app-home",
  imports: [Card, NgClass, PrimeTemplate, ButtonDirective, ButtonLabel],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  public cars: any[] = [];
  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.cars = this.vehicleService.getAll();
    console.log(this.cars);
  }
}
