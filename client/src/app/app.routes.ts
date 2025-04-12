import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { VehicleDetailsComponent } from "./components/vehicle-details/vehicle-details.component";
import { AuthGuard } from "@guards/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "MoMotors" },
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "Tableau de bord",
    canActivate: [AuthGuard],
  },
  {
    path: "transactions",
    component: TransactionsComponent,
    title: "Mes dossiers",
    canActivate: [AuthGuard],
  },
  {
    path: "vehicle-details/:id",
    component: VehicleDetailsComponent,
    title: "Annonce",
  },
];
