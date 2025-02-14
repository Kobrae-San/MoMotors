import { Component } from "@angular/core";
import { VehicleComponent } from "../vehicle/vehicle.component";

@Component({
  selector: "app-home",
  imports: [VehicleComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
