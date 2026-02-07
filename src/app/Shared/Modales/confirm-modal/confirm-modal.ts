import { Component, EventEmitter, inject, input, model, Output, signal } from '@angular/core';
import { PacienteService } from '../../../Data/Services/paciente-service';
import { MedicoService } from '../../../Data/Services/medico-service';
import { AdministradorService } from '../../../Data/Services/administrador-service';
import { ErrorModal } from "../error-modal/error-modal";

@Component({
  selector: 'app-confirm-modal',
  imports: [ErrorModal],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  isOpenConfirm = model<boolean>(false);
  isOpenError = model<boolean>(false);
  titleError = signal<string>('');
  mensajeError = signal<string>('');
  numeroDocumento = input<number>(0);
  usuario = input<string>('');

  pacienteService = inject(PacienteService);
  medicoService = inject(MedicoService);
  administradorService = inject(AdministradorService);

  @Output() usuarioEliminado = new EventEmitter<void>();

  aceptar() {
    switch (this.usuario()) {
      case 'Paciente':
        this.pacienteService.eliminarPaciente(this.numeroDocumento()).subscribe({
          next: () => {
            this.titleError.set('Eliminación Exitosa');
            this.mensajeError.set('Eliminación exitosa. Paciente eliminado con Éxito');
            this.isOpenError.set(true);
            setTimeout(() => {
              this.isOpenError.set(false);
              this.usuarioEliminado.emit();
              this.isOpenConfirm.set(false);
            }, 1500);
          }
        });
        break;
      case 'Médico':
        this.medicoService.eliminarMedico(this.numeroDocumento()).subscribe({
          next: () => {
            this.isOpenConfirm.set(false);
          }
        });
        break;
      default:
        this.administradorService.eliminarADministrador(this.numeroDocumento()).subscribe({
          next: () => {
            this.isOpenConfirm.set(false);
          }
        });

    }
  }

  cancelar() {
    this.isOpenConfirm.set(false);
  }

}
