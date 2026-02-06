import { Component, inject, OnInit, signal } from '@angular/core';
import { PacienteService } from '../../../Data/Services/paciente-service';
import { Paciente, PacienteDTO } from '../../../Data/Interfaces/Paciente';
import { RegistrarUsuario } from "../../../Shared/Modales/registrar-usuario/registrar-usuario";

@Component({
  selector: 'app-pacientes-administrador',
  imports: [RegistrarUsuario],
  templateUrl: './pacientes-administrador.html',
  styleUrl: './pacientes-administrador.css',
})
export class PacientesAdministrador implements OnInit {
  paciente = signal<Paciente | null>(null);
  isOpenForm = signal<boolean>(false);
  pacienteService: PacienteService = inject(PacienteService);
  pacientesTotales = signal<number>(0);
  pacientes = signal<PacienteDTO[]>([]);

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes.set(pacientes);
        this.pacientesTotales.set(pacientes.length);
      }
    });
  }

  registrar(){
    this.paciente.set(null);
    this.isOpenForm.set(true);
  }

  editUser(numeroDocumento:number){
    this.pacienteService.obtenerPacientePorId(numeroDocumento).subscribe({
      next: (paciente) =>{
        this.paciente.set(paciente);
        this.isOpenForm.set(true);
      }
    });
  }

  deleteUser(numeroDocumento:number){
    this.pacienteService.eliminarPaciente(numeroDocumento).subscribe({
      next: () =>{
        this.cargarPacientes();
      }
    });
  }
}
