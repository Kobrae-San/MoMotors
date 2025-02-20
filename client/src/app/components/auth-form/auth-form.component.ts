import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Dialog } from "primeng/dialog";
import { Password } from "primeng/password";
import { Button } from "primeng/button";
import { FloatLabelModule } from "primeng/floatlabel";
import { NgIf } from "@angular/common";
import { InputText } from "primeng/inputtext";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
  imports: [
    Dialog,
    ReactiveFormsModule,
    Password,
    Button,
    FloatLabelModule,
    NgIf,
    InputText,
  ],
})
export class AuthFormComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;

  @Input() isLogin: boolean = true;

  @Output() close = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  constructor() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.toggle.emit();
  }

  public closeForm() {
    this.close.emit();
    this.ref.close();
  }

  public onSubmit(isLogin: boolean) {
    const form = isLogin ? this.loginForm : this.registerForm;

    if (form.invalid) return;

    if (isLogin) {
      console.log("Connexion avec", this.loginForm.value);
    } else {
      console.log("Inscription avec", {
        ...this.registerForm.value,
      });
    }

    this.close.emit();
    this.ref.close();
  }
}
