import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  private apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteTransaction(transactionId: number): Observable<any> {
    const url = `${this.apiUrl}/${transactionId}`;
    return this.http.delete<any>(url);
  }
}
