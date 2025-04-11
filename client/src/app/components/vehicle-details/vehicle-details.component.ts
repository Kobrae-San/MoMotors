import { CurrencyPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { GalleriaModule } from "primeng/galleria";
import { SelectModule } from "primeng/select";
import { TagModule } from "primeng/tag";
import { VehicleType } from "@enums/vehicle.enum";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddTransactionsComponent } from "@components/add-transactions/add-transactions.component";

@Component({
  selector: "app-vehicle-details",
  imports: [
    CurrencyPipe,
    GalleriaModule,
    DividerModule,
    ButtonModule,
    CardModule,
    TagModule,
    SelectModule,
  ],
  providers: [DialogService, MessageService],

  templateUrl: "./vehicle-details.component.html",
  styleUrls: ["./vehicle-details.component.scss"],
})
export class VehicleDetailsComponent {
  private router = inject(Router);
  public ref: DynamicDialogRef | undefined;
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  images: any[] = [];
  vehicle: any = null;
  vehicleId: number | null = null;
  vehicleType = VehicleType;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.vehicle = navigation?.extras.state?.["vehicle"] ?? null;
    this.loadImages();
  }

  loadImages() {
    this.images = [
      { itemImageSrc: this.vehicle.imageUrl, alt: "Vue principale" },
      {
        itemImageSrc: "https://via.placeholder.com/638x424.2",
        alt: "Vue latérale",
      },
      {
        itemImageSrc: "https://via.placeholder.com/638x424.2",
        alt: "Vue arrière",
      },
    ];
  }

  getType(type: string) {
    return type === VehicleType.Sale ? "secondary" : "info";
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  requestTransaction() {
    const dialogHeight =
      this.vehicle.type === this.vehicleType.Sale ? "200px" : "500px";

    this.ref = this.dialogService.open(AddTransactionsComponent, {
      header: "Faire une demande de dossier",
      width: "50%",
      contentStyle: { height: dialogHeight, overflow: "auto" },
      closable: true,
      data: this.vehicle,
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
