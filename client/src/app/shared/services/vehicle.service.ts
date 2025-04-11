import { inject, Injectable } from "@angular/core";
import Vehicle from "../interfaces/vehicle.interface";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface Response {
  status: string;
  data: Vehicle[] | any[];
}

interface ResponseVehicle {}
@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public apiUrl = "http://localhost:3003";

  private http = inject(HttpClient);

  constructor() {}

  public getAllVehicles() {
    return this.http.get<Response>(`${this.apiUrl}/vehicles`);
  }

  public getVehicleById(id_vehicle: number) {
    return this.http.get<Response>(`${this.apiUrl}/vehicle/${id_vehicle}`);
  }

  public createVehicle(id_user: number, vehicle: Vehicle) {
    return this.http.post<Response>(
      `${this.apiUrl}/vehicle/create/${id_user}`,
      vehicle
    );
  }

  public addVehiclePictures(
    id_user: number,
    id_vehicle: number,
    files: FormData
  ) {
    return this.http.post(
      `${this.apiUrl}/vehicle/${id_vehicle}/create/pictures/${id_user}`,
      files
    );
  }

  public updateVehicle(id_vehicle: number, id_user: number, updatedData: any) {
    return this.http.put<Vehicle>(
      `${this.apiUrl}/vehicle/${id_vehicle}/update/${id_user}`,
      updatedData
    );
  }

  public deleteVehicle(id_vehicle: number, id_user: number): any {
    this.http
      .delete(`${this.apiUrl}/vehicle/${id_vehicle}/delete/${id_user}`)
      .subscribe({
        next: data => {
          return data;
        },
        error: error => {
          console.error("There was an error!", error);
        },
      });
  }
}
