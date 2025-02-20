import { Component, inject, OnInit } from "@angular/core";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import {
  VehicleType,
  VehicleBrand,
  VehicleEnergy,
  VehicleCategory,
} from "../../shared/enums/vehicle.enum";
import { NgIf } from "@angular/common";
import { create } from "domain";
import { VehicleService } from "../../shared/services/vehicle.service";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-vehicle-add",
  imports: [
    SelectModule,
    ButtonModule,
    TextareaModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [MessageService],
  templateUrl: "./vehicle-add.component.html",
  styleUrl: "./vehicle-add.component.scss",
})
export class VehicleAddComponent implements OnInit {
  public form: FormGroup;

  public vehicleType: { name: string; value: string }[] = [];
  public vehicleBrand: { name: string; value: string }[] = [];
  public vehicleEnergy: { name: string; value: string }[] = [];
  public vehicleCategory: { name: string; value: string }[] = [];

  /** SERVICES */
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef);

  constructor() {
    this.form = this.fb.group({
      model: ["", Validators.required],
      year: [
        "",
        [Validators.required, Validators.min(1908), Validators.max(2025)],
      ],
      km: ["", Validators.required],
      type: ["", Validators.required],
      price: ["", Validators.required],
      brand: ["", Validators.required],
      energy: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.vehicleType = this.enumToSelectOptions(VehicleType);
    this.vehicleBrand = this.enumToSelectOptions(VehicleBrand);
    this.vehicleEnergy = this.enumToSelectOptions(VehicleEnergy);
    this.vehicleCategory = this.enumToSelectOptions(VehicleCategory);
  }

  onSubmit() {
    if (this.form.valid) {
      const dataToSend = {
        model: this.form.value.model,
        year: this.form.value.year,
        km: this.form.value.km,
        type: this.form.value.type.name,
        price: this.form.value.price,
        brand: this.form.value.brand.name,
        energy: this.form.value.energy.name,
        category: this.form.value.category.name,
        description: this.form.value.description,
      };
      this.vehicleService.createVehicle(1, dataToSend).subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: `Le véhicule a bien été ajouté à la base de donnée.`,
            life: 3000,
          });
          this.ref.close();
        },
        error => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail:
              "Une erreur est survenue lors de l'ajout du véhicule dans la base de donnée.",
            life: 3000,
          });
        }
      );
    } else {
      console.log("Le formulaire est invalide !");
    }
  }

  private enumToSelectOptions(enumObj: any): { name: string; value: string }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        name: enumObj[key],
        value: enumObj[key],
      }));
  }
}
