import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthFormComponent } from "@components/auth-form/auth-form.component";

@Component({
  selector: "app-header",
  imports: [CommonModule, RouterLinkActive, RouterLink, AuthFormComponent],
  providers: [DynamicDialogRef],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isLogin: boolean = true;
  showAuthForm: boolean = false;

  constructor() {}

  openAuthForm() {
    this.showAuthForm = true;
  }

  closeAuthForm() {
    this.showAuthForm = false;
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
