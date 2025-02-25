import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { VehicleComponent } from "@components/vehicle/vehicle.component";
import { VehicleService } from "@services/vehicle.service";

@Component({
  selector: "app-vehicles-list",
  imports: [CardModule, ButtonModule, VehicleComponent, ToastModule],
  templateUrl: "./vehicles-list.component.html",
  styleUrl: "./vehicles-list.component.scss",
})
export class VehiclesListComponent implements OnInit {
  constructor() {}
  vehicles: any;

  private vehicleService = inject(VehicleService);

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles.data;
    });
  }
}
