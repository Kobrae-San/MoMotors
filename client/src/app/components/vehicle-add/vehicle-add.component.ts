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
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { ProgressBarModule } from "primeng/progressbar";
import { BadgeModule } from "primeng/badge";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import {
  VehicleType,
  VehicleBrand,
  VehicleEnergy,
  VehicleCategory,
} from "../../shared/enums/vehicle.enum";
import { NgFor, NgForOf, NgIf } from "@angular/common";
import { VehicleService } from "../../shared/services/vehicle.service";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { PrimeNG } from "primeng/config";

@Component({
  selector: "app-vehicle-add",
  imports: [
    SelectModule,
    ButtonModule,
    TextareaModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    FileUploadModule,
    ToastModule,
    ProgressBarModule,
    BadgeModule,
    OverlayBadgeModule,
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

  files: File[] = [];

  totalSize: number = 0;

  totalSizePercent: number = 0;

  maxFileSize: number = 5000000;

  index: number = 0;

  /** SERVICES */
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef);

  constructor(private config: PrimeNG) {
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
        response => {
          const filesData = new FormData();
          this.files.forEach(file => {
            const fileWithModifiedName = new File(
              [file],
              `${response.data[0]}_${file.name}`,
              { type: file.type }
            );
            filesData.append("vehicle-pictures", fileWithModifiedName);
          });

          const idVehicle =
            typeof response.data[0] === "number"
              ? response.data[0]
              : parseInt(response.data[0]);
          this.vehicleService
            .addVehiclePictures(1, idVehicle, filesData)
            .subscribe(response => {
              console.log("response", response);
            });
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

  choose(callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(
    event: Event,
    removeFileCallback: (event: Event, index: number) => void,
    index: number
  ) {
    removeFileCallback(event, index);
    this.calculateTotalSize();
    this.updateProgress();
    console.log("click", this.totalSize);
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onClearAllUpload(clear: () => void) {
    clear();
    this.files = [];
    this.calculateTotalSize();
    this.updateProgress();
  }

  onTemplatedUpload() {
    this.messageService.add({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
      life: 3000,
    });
  }

  onSelectedFiles(event: FileSelectEvent) {
    this.files = event.currentFiles;
    this.calculateTotalSize();
    this.updateProgress();
  }

  calculateTotalSize() {
    this.totalSize = this.files.reduce(
      (sum: number, file: File) => sum + file.size,
      0
    );
  }

  updateProgress() {
    this.totalSizePercent = Math.min(
      (this.totalSize / this.maxFileSize) * 100,
      100
    );
  }

  uploadEvent(callback: () => void) {
    console.log("uploadEvent");
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0 && sizes !== undefined) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    if (sizes === undefined) {
      return `${formattedSize}`;
    }
    return `${formattedSize} ${sizes[i]}`;
  }
}
