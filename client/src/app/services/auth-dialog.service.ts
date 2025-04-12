import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private openDialogSource = new Subject<boolean>();

  public openDialog$ = this.openDialogSource.asObservable();

  constructor() {}

  openAuthDialog() {
    this.openDialogSource.next(true);
  }
}
