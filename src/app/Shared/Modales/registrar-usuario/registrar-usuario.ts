import { Component, EventEmitter, inject, input, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../Utilities/PasswordValidator';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModal } from "../error-modal/error-modal";
import { Paciente } from '../../../Data/Interfaces/Paciente';
import { PacienteService } from '../../../Data/Services/paciente-service';
import { AdministradorService } from '../../../Data/Services/administrador-service';
import { MedicoService } from '../../../Data/Services/medico-service';
import { Medico } from '../../../Data/Interfaces/Medico';
import { Administrador } from '../../../Data/Interfaces/Administrador';

@Component({
  selector: 'app-registrar-usuario',
  imports: [ErrorModal, ReactiveFormsModule],
  templateUrl: './registrar-usuario.html',
  styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario implements OnInit {
  form = inject(FormBuilder)
  pacienteService = inject(PacienteService);
  adminService = inject(AdministradorService);
  medicoService = inject(MedicoService);
  router = inject(Router);
  mensajeError = signal<string | null>(null);
  title = signal<string | null>(null);
  isOpenError = model<boolean>(false);
  isOpenForm = model<boolean>(false);
  userRegister = input<string>('');

  ngOnInit(): void {
    this.actualizarValidadores();
  }

  formularioRegistration: FormGroup = this.form.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8)]],
    barrio: ['', Validators.required],
    seguroMedico: [''],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
    especialidad: [''],
    contrasena: ['', Validators.required],
    confirmarContrasena: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  @Output() usuarioRegistrado = new EventEmitter<void>();

  onSubmit() {
    if (this.formularioRegistration.invalid) return;

    if (this.userRegister() === 'Paciente') {
      const pacienteData: Paciente = this.formularioRegistration.getRawValue();
      this.pacienteService.registrarPaciente(pacienteData).subscribe({
        next: () => {
          this.title.set('Registro Exitoso');
          this.mensajeError.set('Registro exitoso. Paciente guardado con Éxito');
          this.isOpenError.set(true);
          setTimeout(() => {
            this.isOpenError.set(false);
            this.usuarioRegistrado.emit();
            this.isOpenForm.set(false);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.title.set('Error de Registro');
            this.mensajeError.set("El número de documento ya está registrado");
            this.isOpenError.set(true);
          } else {
            this.title.set('Error de Registro');
            this.mensajeError.set('Error en el registro. Por favor, intente nuevamente.');
            this.isOpenError.set(true);
          }
        }
      });
    }
    else if (this.userRegister() === 'Médico') {
      const medicoData: Medico = this.formularioRegistration.getRawValue();
      this.medicoService.registrarMedico(medicoData).subscribe({
        next: () => {
          this.title.set('Registro Exitoso');
          this.mensajeError.set('Registro exitoso. Médico guardado con Éxito');
          this.isOpenError.set(true);
          setTimeout(() => {
            this.isOpenError.set(false);
            this.usuarioRegistrado.emit();
            this.isOpenForm.set(false);
          }, 2500);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.title.set('Error de Registro');
            this.mensajeError.set("El número de documento ya está registrado");
            this.isOpenError.set(true);
          } else {
            this.title.set('Error de Registro');
            this.mensajeError.set('Error en el registro. Por favor, intente nuevamente.');
            this.isOpenError.set(true);
          }
        }
      });
    } else {
      const adminData: Administrador = this.formularioRegistration.getRawValue();
      this.adminService.registrarAdministrador(adminData).subscribe({
        next: () => {
          this.title.set('Registro Exitoso');
          this.mensajeError.set('Registro exitoso. Administrador guardado con Éxito');
          this.isOpenError.set(true);
          setTimeout(() => {
            this.isOpenError.set(false);
            this.usuarioRegistrado.emit();
            this.isOpenForm.set(false);
          }, 2500);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.title.set('Error de Registro');
            this.mensajeError.set("El número de documento ya está registrado");
            this.isOpenError.set(true);
          } else {
            this.title.set('Error de Registro');
            this.mensajeError.set('Error en el registro. Por favor, intente nuevamente.');
            this.isOpenError.set(true);
          }
        }
      });
    }
  }


  hasError(controlName: string, errorType: string): boolean {
    const control = this.formularioRegistration.get(controlName);
    return control?.hasError(errorType) && (control.dirty || control.touched) || false;
  }

  actualizarValidadores() {
    const especialidadCtrl = this.formularioRegistration.get('especialidad');
    const seguroCtrl = this.formularioRegistration.get('seguroMedico');
    especialidadCtrl?.clearValidators();
    seguroCtrl?.clearValidators();
    if (this.userRegister() === 'Médico') {
      especialidadCtrl?.setValidators([Validators.required]);
      seguroCtrl?.setValue(''); // Limpiar valor por si acaso
    } else if (this.userRegister() === 'Paciente') {
      seguroCtrl?.setValidators([Validators.required]);
      especialidadCtrl?.setValue('');
    }
    especialidadCtrl?.updateValueAndValidity();
    seguroCtrl?.updateValueAndValidity();
  }

}

