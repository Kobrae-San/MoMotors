import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { VehicleDetailsComponent } from "./components/vehicle-details/vehicle-details.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Accueil" },
  { path: "achat", component: HomeComponent, title: "Achat" },
  { path: "location", component: HomeComponent, title: "Location" },
  { path: "dashboard", component: DashboardComponent, title: "Dashboard" },
  {
    path: "transactions",
    component: TransactionsComponent,
    title: "transactions",
  },
  { path: "vehicle-details/:id", component: VehicleDetailsComponent },
];
