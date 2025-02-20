import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Transaction from "../interfaces/transaction.interface";

interface Response {
  status: string;
  data: Transaction[];
}
@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  private apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) {}

  public getAllTransactions() {
    return this.http.get<Response>(this.apiUrl);
  }

  public getTransactionById(id_transaction: number) {
    return this.http.get<Response>(`${this.apiUrl}/${id_transaction}`);
  }

  public createTransaction(id_user: number, transaction: Transaction) {
    return this.http.post<Response>(`${this.apiUrl}/create`, transaction);
  }

  public updateTransaction(
    id_transaction: number,
    updatedTransaction: Transaction
  ) {
    return this.http.patch<Response>(
      `${this.apiUrl}/${id_transaction}`,
      updatedTransaction
    );
  }

  public deleteTransaction(transactionId: number) {
    return this.http.delete<Response>(`${this.apiUrl}/${transactionId}`);
  }
}
