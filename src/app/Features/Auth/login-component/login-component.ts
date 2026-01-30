import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../Core/Services/auth-service';
import { LoginRequest } from '../../../Data/Interfaces/LoginRequest';
import { ErrorModal } from "../../../Shared/Modales/error-modal/error-modal";

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule, ErrorModal],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  form = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);
  isOpen = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  title = signal<string | null>(null);

  formularioLogin: FormGroup = this.form.group({
    Username: ['', [Validators.required, Validators.minLength(8)]],
    Password: ['', Validators.required]
  })

  hasError(controlName: string, errorType:string): boolean {
    const control = this.formularioLogin.get(controlName);
    return control?.hasError(errorType) && (control.dirty || control.touched) || false;
  }

  onSubmit() {
    if (this.formularioLogin.invalid) return;


    const credenciales: LoginRequest = this.formularioLogin.getRawValue();

    this.authService.login(credenciales).subscribe({
      next: () => {
        const role = this.authService.getUserRole();
        this.redirectByUserRole(role);
      },
      error: (err) => {
        this.errorMessage.set("Credenciales Incorrectas. Por favor, intente nuevamente.");
        this.title.set('Error de Inicio de Sesión');
        this.isOpen.set(true);
      }
    })
  }

  private redirectByUserRole(role: string | null) {
    switch (role) {
      case 'ROLE_ADMINISTRADOR':
        this.router.navigate(['/admin/inicio']);
        break;
      case 'ROLE_MEDICO':
        this.router.navigate(['/medico/inicio']);
        break;
      case 'ROLE_PACIENTE':
        this.router.navigate(['/paciente/inicio']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
