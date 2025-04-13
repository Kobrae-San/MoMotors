import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthFormComponent } from "@components/auth-form/auth-form.component";
import { AuthDialogService } from "@services/auth-dialog.service";
import { AuthService } from "@services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  imports: [CommonModule, RouterLinkActive, RouterLink, AuthFormComponent],
  providers: [DynamicDialogRef],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin: boolean = true;
  showAuthForm: boolean = false;
  private subscription: Subscription = new Subscription();
  public isAuthenticated: boolean = false;

  constructor(
    private authDialogService: AuthDialogService,
    private authService: AuthService) {}

  ngOnInit() {
    this.subscription.add(
      this.authDialogService.openDialog$.subscribe(() => {
        this.showAuthForm = true;
        this.isLogin = true;
      })
    );
    this.subscription.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openAuthForm() {
    this.showAuthForm = true;
  }

  closeAuthForm() {
    this.showAuthForm = false;
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }
  logout() {
    this.authService.logout();
  }
}
