import { CurrencyPipe } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { Card } from "primeng/card";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ToastModule } from "primeng/toast";
import {
  VehicleBrand,
  VehicleCategory,
  VehicleEnergy,
  VehicleType,
} from "@enums/vehicle.enum";
import { AddTransactionsComponent } from "@components/add-transactions/add-transactions.component";

@Component({
  selector: "app-vehicle",
  standalone: true,
  imports: [Card, Button, CurrencyPipe, ToastModule],
  providers: [DialogService, MessageService],
  templateUrl: "./vehicle.component.html",
  styleUrl: "./vehicle.component.scss",
})
export class VehicleComponent {
  private router = inject(Router);
  public ref: DynamicDialogRef | undefined;
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);

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

  requestTransaction() {
    const dialogHeight =
      this.getVehicleData().type === this.vehicleType.Sale ? "200px" : "500px";

    this.ref = this.dialogService.open(AddTransactionsComponent, {
      header: "Faire une demande de dossier",
      width: "50%",
      contentStyle: { height: dialogHeight, overflow: "auto" },
      closable: true,
      data: this.getVehicleData(),
    });
    this.ref.onClose.subscribe(
      result => {
        if (result) {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: `La demande de dossier a bien été exécutée`,
            life: 3000,
          });
        }
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "Une erreur est survenue lors de la demande de dossier",
          life: 3000,
        });
      }
    );
  }
}
