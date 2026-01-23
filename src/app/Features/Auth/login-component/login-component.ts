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

  formularioContacto: FormGroup = this.form.group({
    Username: ['', [Validators.required, Validators.minLength(8)]],
    Password: ['', Validators.required]
  })

  onSubmit() {
    if (this.formularioContacto.invalid) return;

    this.errorMessage.set(null);

    const credenciales: LoginRequest = this.formularioContacto.getRawValue();

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
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'ROLE_MEDICO':
        this.router.navigate(['/medico/dashboard']);
        break;
      case 'ROLE_PACIENTE':
        this.router.navigate(['/paciente/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
