import { Component } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { VehiclesListComponent } from "@components/vehicles-list/vehicles-list.component";

@Component({
  selector: "app-home",
  imports: [VehiclesListComponent, PanelModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
