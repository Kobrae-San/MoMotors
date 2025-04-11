import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
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
import { UserService } from "@services/user.service";
import {AuthService} from '@services/auth_service';

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
export class AuthFormComponent implements OnDestroy {
  loginForm: FormGroup;
  registerForm: FormGroup;

  @Input() isLogin: boolean = true;

  @Output() close = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private userservice = inject(UserService);
  private authservice = inject(AuthService)

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

  ngOnDestroy() {
    this.close.emit();
    this.ref.close();
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
      this.loginForm.value.username = this.loginForm.value.email;

      this.authservice.login(this.loginForm.value).subscribe({
        next: response => {
          console.log("connexion reussi", response);
        },
        error: err => {
          console.error("erreur de connexion", err);
        },
      });
    } else {
      this.registerForm.value.username = this.registerForm.value.email;

      this.userservice.createUser(this.registerForm.value).subscribe({
        next: response => {
          console.log("connexion reussi", response);
        },
        error: err => {
          console.error("erreur de connexion", err);
        },
      });
    }

    this.close.emit();
    this.ref.close();
  }
}
