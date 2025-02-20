import { Component, inject, OnInit } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { EditVehicleDialogComponent } from "../edit-vehicle-dialog/edit-vehicle-dialog.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { VehicleAddComponent } from "../vehicle-add/vehicle-add.component";
import { VehicleService } from "../../shared/services/vehicle.service";

@Component({
  selector: "app-dashboard",
  imports: [PanelModule, TableModule, TagModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  vehicleData!: any[];
  selectedVehicle: any = null;

  public ref: DynamicDialogRef | undefined;

  /** SERVICES */
  private dialogService = inject(DialogService);
  private vehicleService = inject(VehicleService);

  constructor() {}

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe({
      next: data => {
        this.vehicleData = data.data;
      },
      error: err => console.error("Erreur lors du chargement :", err),
    });
  }

  getVehicles() {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicleData = vehicles.data;
    });
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
    this.ref = this.dialogService.open(EditVehicleDialogComponent, {
      header: "Modifier le véhicule",
      width: "50%",
      contentStyle: { height: "1000px", overflow: "auto" },
      closable: true,
      data: vehicle,
    });
    this.ref.onClose.subscribe(() => {
      this.getVehicles();
    });
  }

  addVehicle() {
    this.ref = this.dialogService.open(VehicleAddComponent, {
      header: "Ajout d'un vehicule",
      width: "50%",
      contentStyle: { height: "1000px", overflow: "auto" },
      closable: true,
    });
    this.ref.onClose.subscribe(() => {
      this.getVehicles();
    });
  }

  deleteVehicle(vehicle: any) {
    this.vehicleService.deleteVehicle(vehicle.id, 1).subscribe(() => {
      this.getVehicles();
    });
  }
}
