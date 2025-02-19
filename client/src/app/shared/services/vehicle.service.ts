import { Injectable } from "@angular/core";
import Vehicle from "../interfaces/vehicle.interface";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public apiUrl = "http://localhost:3003";

  constructor() {}

  public async getAllVehicles() {
    try {
      const response = await fetch(this.apiUrl + "/vehicles");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des véhicules");
      }
      const vehicles = await response.json();
      return vehicles.data;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    }
  }

  public async getVehicleById(id: number) {
    try {
      const response = await fetch(this.apiUrl + "/vehicle/" + id);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du vehicule");
      }
      const vehicle = await response.json();
      return vehicle.data;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    }
  }

  public async createVehicle(id_user: number, vehicle: Vehicle) {
    try {
      const response = await fetch(`${this.apiUrl}/vehicle/create/${id_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du véhicule");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      return null;
    }
  }

  public async updateVehicle(
    id_vehicle: number,
    id_user: number,
    updatedData: any
  ) {
    try {
      const response = await fetch(
        `${this.apiUrl}/vehicle/${id_vehicle}/update/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du véhicule");
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      return null;
    }
  }

  public async deleteVehicle(id_vehicle: number, id_user: number) {
    try {
      const response = await fetch(
        `${this.apiUrl}/vehicle/${id_vehicle}/delete/${id_user}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du véhicule");
      }

      return true;
    } catch (error) {
      console.error("Erreur:", error);
      return false;
    }
  }
}
