import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
  Inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Select, SelectModule } from "primeng/select";
import { Textarea, TextareaModule } from "primeng/textarea";
import { NgIf } from "@angular/common";
import { MessageService } from "primeng/api";
import {
  VehicleType,
  VehicleBrand,
  VehicleEnergy,
  VehicleCategory,
} from "../../shared/enums/vehicle.enum";
import { VehicleService } from "../../shared/services/vehicle.service";

@Component({
  selector: "app-edit-vehicle-dialog",
  imports: [
    TextareaModule,
    SelectModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [MessageService],
  templateUrl: "./edit-vehicle-dialog.component.html",
  styleUrls: ["./edit-vehicle-dialog.component.css"],
})
export class EditVehicleDialogComponent implements OnInit {
  form: FormGroup;
  public vehicleType: { name: string; value: string }[] = [];
  public vehicleBrand: { name: string; value: string }[] = [];
  public vehicleEnergy: { name: string; value: string }[] = [];
  public vehicleCategory: { name: string; value: string }[] = [];

  private vehicleService = inject(VehicleService);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef);

  vehicleDetails: any;

  public config = inject(DynamicDialogConfig);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      model: ["", Validators.required],
      year: [
        "",
        [Validators.required, Validators.min(1908), Validators.max(2025)],
      ],
      km: [``, Validators.required],
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
    this.vehicleDetails = this.config.data;

    this.form = this.fb.group({
      model: [`${this.vehicleDetails.model}`, Validators.required],
      year: [
        `${this.vehicleDetails.year}`,
        [Validators.required, Validators.min(1908), Validators.max(2025)],
      ],
      km: [`${this.vehicleDetails.km}`, Validators.required],
      type: [
        this.checkIfValueMatch(this.vehicleType, this.vehicleDetails.type),
        Validators.required,
      ],
      price: [`${this.vehicleDetails.price}`, Validators.required],
      brand: [
        this.checkIfValueMatch(this.vehicleBrand, this.vehicleDetails.brand),
        Validators.required,
      ],
      energy: [
        this.checkIfValueMatch(this.vehicleEnergy, this.vehicleDetails.energy),
        Validators.required,
      ],
      category: [
        this.checkIfValueMatch(
          this.vehicleCategory,
          this.vehicleDetails.category
        ),
        Validators.required,
      ],
      description: [
        `${this.vehicleDetails.description}`,
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }

  private enumToSelectOptions(enumObj: any): { name: string; value: string }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        name: enumObj[key],
        value: enumObj[key],
      }));
  }

  private checkIfValueMatch(
    valueToCheck: { name: string; value: string }[],
    valueToCompare: string
  ) {
    return valueToCheck.find(item => item.name == valueToCompare);
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

      this.vehicleService
        .updateVehicle(this.vehicleDetails.id, 1, dataToSend)
        .subscribe(
          () => {
            this.messageService.add({
              severity: "success",
              summary: "Suppression",
              detail: `Le véhicule a bien été modifié dans la base de donnée.`,
              life: 3000,
            });
            this.ref.close();
          },
          error => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail:
                "Une erreur est survenue lors de la modification du véhicule dans la base de donnée.",
              life: 3000,
            });
          }
        );
    }
  }
}
