import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../Services/auth-service';
import { LoginRequest } from '../../Models/LoginRequest';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  form = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  
  formularioContacto:FormGroup = this.form.group({
    Username: ['', [Validators.required,Validators.minLength(8)]],
    Password: ['', Validators.required]
  })

  onSubmit(){
    if(this.formularioContacto.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credenciales:LoginRequest = this.formularioContacto.getRawValue();

    this.authService.login(credenciales).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    })
  }
}
