import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Accueil" },
  { path: "achat", component: HomeComponent, title: "Achat" },
  { path: "location", component: HomeComponent, title: "Location" },
  {
    path: "transactions",
    component: TransactionsComponent,
    title: "transactions",
  },
];
