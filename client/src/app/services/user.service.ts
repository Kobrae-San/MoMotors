import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import User from "@interfaces/user.interface";

interface Response {
  status: string;
  data: User[];
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  public apiUrl = "http://localhost:3002";

  private http = inject(HttpClient);

  constructor() {}

  public getAllUsers() {
    return this.http.get<Response>(`${this.apiUrl}`);
  }

  public getUserById(id_user: number) {
    return this.http.get<Response>(`${this.apiUrl}/${id_user}`);
  }

  public loginUser(user: User) {
    return this.http.post<Response>(`${this.apiUrl}/login`, user);
  }

  public createUser(user: User) {
    return this.http.post<Response>(`${this.apiUrl}/register`, user);
  }

  public updateUser(id_user: number, updatedUser: any) {
    return this.http.patch<Response>(`${this.apiUrl}/${id_user}`, updatedUser);
  }

  public deleteUser(id_user: number) {
    return this.http.delete<Response>(`${this.apiUrl}/${id_user}`);
  }
}
