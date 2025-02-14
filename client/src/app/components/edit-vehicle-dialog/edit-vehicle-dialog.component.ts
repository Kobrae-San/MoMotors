import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputText } from "primeng/inputtext";

@Component({
  selector: "app-edit-vehicle-dialog",
  imports: [
    DialogModule,
    ButtonModule,
    InputText,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./edit-vehicle-dialog.component.html",
  styleUrls: ["./edit-vehicle-dialog.component.css"],
})
export class EditVehicleDialogComponent implements OnInit {
  @Input() displayEditVehicleDialog: boolean = false;
  @Input() vehicle: any = {};
  @Output() displayEditVehicleDialogChange = new EventEmitter<boolean>();
  @Output() vehicleUpdated = new EventEmitter<any>();

  vehicleForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.vehicle) {
      this.updateForm();
    }
  }

  initForm() {
    this.vehicleForm = this.fb.group({
      id: [{ value: "", disabled: true }],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  updateForm() {
    this.vehicleForm.patchValue({
      id: this.vehicle.id,
      brand: this.vehicle.brand,
      model: this.vehicle.model,
      price: this.vehicle.price,
    });
  }

  saveChanges() {
    if (this.vehicleForm.valid) {
      const updatedVehicle = {
        ...this.vehicle,
        ...this.vehicleForm.getRawValue(),
      };
      this.vehicleUpdated.emit(updatedVehicle);
      this.closeDialog();
    }
  }

  closeDialog() {
    this.displayEditVehicleDialog = false;
    this.displayEditVehicleDialogChange.emit(this.displayEditVehicleDialog);
  }
}
