import { Component, OnInit } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { DashboardService } from "../../shared/services/dashboard.service";
import { EditVehicleDialogComponent } from "../edit-vehicle-dialog/edit-vehicle-dialog.component";

@Component({
  selector: "app-dashboard",
  imports: [
    PanelModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    EditVehicleDialogComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  displayEditVehicleDialog: boolean = false;
  vehicleData!: any[];
  selectedVehicle: any = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.vehicleData = this.dashboardService.getvehicleData();
  }

  getType(type: string) {
    switch (type) {
      case "Vente":
        return "success";
      case "Location":
        return "warn";
      default:
        return "info";
    }
  }

  editVehicle(vehicle: any) {
    this.selectedVehicle = { ...vehicle };
    this.displayEditVehicleDialog = true;
  }

  updateVehicle(updatedVehicle: any) {
    const index = this.vehicleData.findIndex(
      vehiculeItem => vehiculeItem.id === updatedVehicle.id
    );
    if (index !== -1) {
      this.vehicleData[index] = updatedVehicle;
    }
    this.displayEditVehicleDialog = false;
  }
}
