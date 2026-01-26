import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../Core/Services/auth-service';
import { LoginRequest } from '../../../Data/Interfaces/LoginRequest';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  form = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = signal<string | null>(null);

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

    this.errorMessage.set(null);

    const credenciales: LoginRequest = this.formularioLogin.getRawValue();

    this.authService.login(credenciales).subscribe({
      next: () => {
        const role = this.authService.getUserRole();
        this.redirectByUserRole(role);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Error de autenticación');
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
