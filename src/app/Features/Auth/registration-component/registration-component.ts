import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../Core/Services/auth-service';
import { RegisterRequest } from '../../../Data/Interfaces/RegisterRequest';
import { passwordMatchValidator } from '../../../Shared/Utilities/PasswordValidator';

@Component({
  selector: 'app-registration-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registration-component.html',
  styleUrl: './registration-component.css',
})
export class RegistrationComponent {
  form = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);

  formularioRegistration: FormGroup = this.form.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8)]],
    barrio: ['', Validators.required],
    seguroMedico: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    contrasena: ['', Validators.required],
    confirmarContrasena: ['', Validators.required]
  },{ validators: passwordMatchValidator });

  onSubmit() {
    if (this.formularioRegistration.invalid) return;

    const userData: RegisterRequest = this.formularioRegistration.getRawValue();

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during registration:', err);
      }
    })
  }


  hasError(controlName: string, errorType:string): boolean {
    const control = this.formularioRegistration.get(controlName);
    return control?.hasError(errorType) && (control.dirty || control.touched) || false;
  }
}
