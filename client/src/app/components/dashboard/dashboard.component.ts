import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import Vehicle from "@interfaces/vehicle.interface";
import { VehicleService } from "@services/vehicle.service";
import { EditVehicleDialogComponent } from "@components/edit-vehicle-dialog/edit-vehicle-dialog.component";
import { TransactionsComponent } from "@components/transactions/transactions.component";
import { VehicleAddComponent } from "@components/vehicle-add/vehicle-add.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-dashboard",
  imports: [
    PanelModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    TransactionsComponent,
    ToastModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  vehicleData!: any[];
  selectedVehicle: any = null;

  public ref: DynamicDialogRef | undefined;
  private router = inject(Router);

  /** SERVICES */
  private dialogService = inject(DialogService);
  private vehicleService = inject(VehicleService);
  private messageService = inject(MessageService);

  constructor() {}

  ngOnInit() {
    this.getVehicles();
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

  goToDetails(vehicle: Vehicle) {
    this.router.navigate(["/vehicle-details", vehicle.id], {
      state: { vehicle: vehicle },
    });
  }

  editVehicle(vehicle: Vehicle) {
    this.ref = this.dialogService.open(EditVehicleDialogComponent, {
      header: "Modifier le véhicule",
      width: "50%",
      contentStyle: { height: "1000px", overflow: "auto" },
      closable: true,
      data: vehicle,
    });
    this.ref.onClose.subscribe(
      result => {
        if (result) {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: "La modification du véhicule a bien été exécutée",
            life: 3000,
          });
          this.getVehicles();
        }
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Une erreur est survenue lors de la modification du véhicule",
          life: 3000,
        });
      }
    );
  }

  addVehicle() {
    this.ref = this.dialogService.open(VehicleAddComponent, {
      header: "Ajout d'un vehicule",
      width: "50%",
      contentStyle: { height: "1000px", overflow: "auto" },
      closable: true,
    });
    this.ref.onClose.subscribe(
      result => {
        if (result) {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: "La demande d'ajout du véhicule a bien été exécutée",
            life: 3000,
          });
          this.getVehicles();
        }
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Une erreur est survenue lors de l'ajout du véhicule",
          life: 3000,
        });
      }
    );
  }

  deleteVehicle(vehicle: any) {
    this.vehicleService.deleteVehicle(vehicle.id, 2).subscribe(
      result => {
        if (result) {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: "La suppression du véhicule a bien été exécutée",
            life: 3000,
          });
          this.getVehicles();
        }
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Une erreur est survenue lors de la suppression du véhicule",
          life: 3000,
        });
      }
    );
  }
}
