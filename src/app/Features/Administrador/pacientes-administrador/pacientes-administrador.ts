import { Component, inject, OnInit, signal } from '@angular/core';
import { PacienteService } from '../../../Data/Services/paciente-service';
import { Paciente, PacienteDTO } from '../../../Data/Interfaces/Paciente';
import { RegistrarUsuario } from "../../../Shared/Modales/registrar-usuario/registrar-usuario";
import { ConfirmModal } from "../../../Shared/Modales/confirm-modal/confirm-modal";

@Component({
  selector: 'app-pacientes-administrador',
  imports: [RegistrarUsuario, ConfirmModal],
  templateUrl: './pacientes-administrador.html',
  styleUrl: './pacientes-administrador.css',
})
export class PacientesAdministrador implements OnInit {

  paciente = signal<Paciente | null>(null);
  isOpenForm = signal<boolean>(false);
  isOpenConfirm = signal<boolean>(false);
  numeroDocumento = signal<number>(0);
  pacientesTotales = signal<number>(0);
  pacientesActivos = signal<number>(0);
  pacientesInactivos = signal<number>(0);
  pacientes = signal<PacienteDTO[]>([]);

  pacienteService: PacienteService = inject(PacienteService);


  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes.set(pacientes);
        this.pacientesTotales.set(pacientes.length);
        this.pacientesActivos.set(pacientes.filter(paciente => paciente.estado === 'ACTIVO').length);
        this.pacientesInactivos.set(pacientes.filter(paciente => paciente.estado === 'INACTIVO').length);
      }
    });
  }

  registrar() {
    this.paciente.set(null);
    this.isOpenForm.set(true);
  }

  editUser(numeroDocumento: number) {
    this.pacienteService.obtenerPacientePorId(numeroDocumento).subscribe({
      next: (paciente) => {
        this.paciente.set(paciente);
        this.isOpenForm.set(true);
      }
    });
  }

  deleteUser(numeroDocumento: number) {
    this.numeroDocumento.set(numeroDocumento);
    this.isOpenConfirm.set(true);
  }
}
