import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { TransactionsService } from "../../shared/services/transactions.service";
import { TransactionsDetailsComponent } from "../transactions-details/transactions-details.component";

@Component({
  selector: "app-transactions",
  imports: [
    PanelModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
  ],
  providers: [MessageService, DialogService],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent implements OnInit {
  selectedTransaction: any = null;
  userId: number = 1;
  ref: DynamicDialogRef | undefined;

  constructor(
    private transactionsService: TransactionsService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  transactionsData!: any[];

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionsService
      .getAllTransactions()
      .subscribe(itemsTransactions => {
        this.transactionsData = itemsTransactions.data;
      });
  }

  getType(type: string) {
    switch (type) {
      case "Vente":
        return "secondary";
      case "Location":
        return "info";
      default:
        return "info";
    }
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

  goToDetail(transaction: any) {
    this.selectedTransaction = { ...transaction };

    this.ref = this.dialogService.open(TransactionsDetailsComponent, {
      header: "Gestion de dossiers",
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      closable: true,
      data: {
        transaction: this.selectedTransaction,
      },
    });
  }

  delete(transaction: any) {
    this.transactionsService.deleteTransaction(transaction.id).subscribe(
      result => {
        if (result) {
          this.messageService.add({
            severity: "success",
            summary: "Suppression",
            detail: `Le dossier ${transaction.id} a été supprimé avec succès.`,
            life: 3000,
          });
          this.getTransactions();
        }
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail:
            "Une erreur est survenue lors de la suppression de la transaction.",
          life: 3000,
        });
      }
    );
  }
}
