import { NgIf } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { TagModule } from "primeng/tag";

@Component({
  selector: "app-transactions-details",
  imports: [DialogModule, ButtonModule, TagModule, NgIf],
  templateUrl: "./transactions-details.component.html",
  styleUrl: "./transactions-details.component.scss",
})
export class TransactionsDetailsComponent implements OnInit {
  transaction: any;

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.transaction = this.config.data.transaction;
    console.log(this.transaction);
  }

  getStatus(status: string) {
    switch (status) {
      case "Validé":
        return "success";
      case "En attente":
        return "warn";
      case "Refusé":
        return "danger";
      default:
        return "info";
    }
  }
}
