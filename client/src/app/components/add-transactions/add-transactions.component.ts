import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";

import { TransactionStatus } from "../../shared/enums/transaction.enum";
import { VehicleType } from "../../shared/enums/vehicle.enum";
import Transaction from "../../shared/interfaces/transaction.interface";
import Vehicle from "../../shared/interfaces/vehicle.interface";
import { TransactionsService } from "../../shared/services/transactions.service";
import { CheckboxModule } from "primeng/checkbox";

@Component({
  selector: "app-add-transactions",
  templateUrl: "./add-transactions.component.html",
  styleUrl: "./add-transactions.component.scss",
  imports: [
    DialogModule,
    ButtonModule,
    NgIf,
    TagModule,
    DatePickerModule,
    FormsModule,
    ToastModule,
    CheckboxModule,
  ],
})
export class AddTransactionsComponent implements OnInit {
  vehicleInformations!: Vehicle;
  vehicleType = VehicleType;
  startDate: Date | undefined;
  endDate: Date | undefined;
  errorMessage: string | null = null;
  isSubmitDisabled = true;
  dossierRequested: boolean = false;

  public ref = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);
  private transcationsService = inject(TransactionsService);

  constructor() {}

  ngOnInit(): void {
    this.vehicleInformations = this.config.data;
  }

  onDateChange() {
    this.errorMessage = null;
    this.isSubmitDisabled = false;

    if (!this.startDate || !this.endDate) {
      this.isSubmitDisabled = true;
      return;
    }

    if (this.endDate < this.startDate) {
      this.errorMessage =
        "La date de fin ne peut pas être antérieure à la date de début.";
      this.isSubmitDisabled = true;
    } else if (
      !this.isValidDate(this.startDate) ||
      !this.isValidDate(this.endDate)
    ) {
      this.errorMessage =
        "Les dates doivent être au format correct (YYYY-MM-DD).";
      this.isSubmitDisabled = true;
    } else {
      this.errorMessage = null;
      this.isSubmitDisabled = false;
    }
  }

  isValidDate(date: Date | undefined): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  submitTransaction() {
    if (this.isSubmitDisabled) return;

    const formatDate = (date: Date | undefined): string | null => {
      if (!date) return null;
      return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
      );
    };

    const newTransaction: Transaction = {
      id_vehicle: this.vehicleInformations.id ?? 0,
      id_user: 2,
      status: TransactionStatus.Pending,
      id_admin: 1,
      start_time: formatDate(this.startDate) as any,
      end_time: formatDate(this.endDate) as any,
    };
    this.transcationsService
      .createTransaction(newTransaction.id_user, newTransaction)
      .subscribe(() => {
        this.ref.close();
      });
  }
}
