import { CurrencyPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { GalleriaModule } from "primeng/galleria";
import { SelectModule } from "primeng/select";
import { TagModule } from "primeng/tag";
import { VehicleType } from "../../shared/enums/vehicle.enum";

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
  templateUrl: "./vehicle-details.component.html",
  styleUrls: ["./vehicle-details.component.scss"],
})
export class VehicleDetailsComponent {
  private router = inject(Router);
  images: any[] = [];
  vehicle: any = null;
  vehicleId: number | null = null;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.vehicle = navigation?.extras.state?.["vehicle"] ?? null;
    this.loadImages();
    console.log(this.vehicle);
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

  requestFile() {
    console.log("demande de dossier");
  }
}
