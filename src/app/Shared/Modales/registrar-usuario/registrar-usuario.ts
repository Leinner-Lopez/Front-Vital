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

  pacienteService = inject(PacienteService);
  adminService = inject(AdministradorService);
  medicoService = inject(MedicoService);

  form = inject(FormBuilder)
  router = inject(Router);

  mensajeError = signal<string | null>(null);
  title = signal<string | null>(null);
  isOpenError = model<boolean>(false);
  isOpenForm = model<boolean>(false);
  userRegister = input<string>('');

  editUser = input<Paciente | Administrador | Medico | null>(null);

  ngOnInit(): void {
    const usuario = this.editUser();

    if (usuario) {
      this.actualizarValidadores();
      this.formularioRegistration.patchValue(usuario);
      this.formularioRegistration.get('contrasena')?.setValue('');
      this.formularioRegistration.get('confirmarContrasena')?.setValue('');
      this.formularioRegistration.get('numeroDocumento')?.disable();
    }else{
      this.actualizarValidadores();
    }
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
    contrasena: [''],
    confirmarContrasena: ['']
  }, { validators: passwordMatchValidator });

  @Output() usuarioRegistrado = new EventEmitter<void>();

  onSubmit() {
    if (this.formularioRegistration.invalid) return;

    const datos = this.formularioRegistration.getRawValue();
    const isEditing = !!this.editUser();
    switch (this.userRegister()) {
      case 'Paciente':
        if (isEditing) {
          this.pacienteService.actualizarPaciente(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Paciente editado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
            }
          })
        } else {
          this.pacienteService.registrarPaciente(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Paciente guardado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
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
        break;
      case 'Médico':
        if (isEditing) {
          this.medicoService.actualizarMedico(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Médico editado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
            }
          });
        } else {
          this.medicoService.registrarMedico(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Médico guardado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
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
        break;
      default:
        if (isEditing) {
          this.adminService.actualizarAdministrador(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Administrador guardado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
            }
          });
        } else {
          this.adminService.registrarAdministrador(datos).subscribe({
            next: () => {
              this.title.set('Registro Exitoso');
              this.mensajeError.set('Registro exitoso. Administrador guardado con Éxito');
              this.isOpenError.set(true);
              setTimeout(() => {
                this.isOpenError.set(false);
                this.usuarioRegistrado.emit();
                this.isOpenForm.set(false);
              }, 1500);
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
  }


  hasError(controlName: string, errorType: string): boolean {
    const control = this.formularioRegistration.get(controlName);
    return control?.hasError(errorType) && (control.dirty || control.touched) || false;
  }

  actualizarValidadores() {
    const contrasena = this.formularioRegistration.get('contrasena');
    const confirmarContrasena = this.formularioRegistration.get('confirmarContrasena');
    const especialidad = this.formularioRegistration.get('especialidad');
    const seguro = this.formularioRegistration.get('seguroMedico');

    [contrasena, confirmarContrasena, especialidad, seguro].forEach(c => c?.clearValidators());

    if (this.editUser()) {
      contrasena?.setValidators(null);
      confirmarContrasena?.setValidators(null);
    } else {
      contrasena?.setValidators([Validators.required]);
      confirmarContrasena?.setValidators([Validators.required]);
    }

    if (this.userRegister() === 'Médico') {
      especialidad?.setValidators([Validators.required]);
      seguro?.setValue('');
    } else if (this.userRegister() === 'Paciente') {
      seguro?.setValidators([Validators.required]);
      especialidad?.setValue('');
    }

    [contrasena, confirmarContrasena, especialidad, seguro].forEach(c => c?.updateValueAndValidity());
  }

}

