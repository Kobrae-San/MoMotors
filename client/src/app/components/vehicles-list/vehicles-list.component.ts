import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { VehicleComponent } from "../vehicle/vehicle.component";
import { VehicleService } from "../../shared/services/vehicle.service";

@Component({
  selector: "app-vehicles-list",
  imports: [CardModule, ButtonModule, VehicleComponent],
  templateUrl: "./vehicles-list.component.html",
  styleUrl: "./vehicles-list.component.scss",
})
export class VehiclesListComponent implements OnInit {
  constructor(private vehiclesService: VehicleService) {}
  vehicles: any;

  ngOnInit(): void {
    this.getVehicles();
  }

  async getVehicles() {
    this.vehicles = await this.vehiclesService.getAllVehicles();
  }
}
