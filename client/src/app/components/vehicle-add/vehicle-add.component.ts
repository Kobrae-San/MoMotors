import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";
import {
  VehicleBrand,
  VehicleCategory,
  VehicleEnergy,
  VehicleType,
} from "@enums/vehicle.enum";
import { VehicleService } from "@services/vehicle.service";

@Component({
  selector: "app-vehicle-add",
  imports: [
    SelectModule,
    ButtonModule,
    TextareaModule,
    ReactiveFormsModule,
    NgIf,
  ],
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
      this.vehicleService.createVehicle(1, dataToSend).subscribe(() => {
        this.ref.close();
      });
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
