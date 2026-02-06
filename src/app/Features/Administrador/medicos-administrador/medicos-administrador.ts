import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicoService } from '../../../Data/Services/medico-service';
import { Medico, MedicoDTO } from '../../../Data/Interfaces/Medico';
import { RegistrarUsuario } from "../../../Shared/Modales/registrar-usuario/registrar-usuario";

@Component({
  selector: 'app-medicos-administrador',
  imports: [RegistrarUsuario],
  templateUrl: './medicos-administrador.html',
  styleUrl: './medicos-administrador.css',
})
export class MedicosAdministrador implements OnInit {
  medicoService: MedicoService = inject(MedicoService);
  medicosTotales = signal<number>(0);
  medicos = signal<MedicoDTO[]>([]);
  medicosInactivos = signal<number>(0);
  medicosActivos = signal<number>(0);
  medico = signal<Medico | null>(null);
  isOpenForm = signal<boolean>(false);

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicos) => {
        this.medicos.set(medicos);
        this.medicosTotales.set(medicos.length);
        this.medicosActivos.set(medicos.filter(medico => medico.estado === 'ACTIVO').length);
        this.medicosInactivos.set(medicos.filter(medico => medico.estado === 'INACTIVO').length);
      }
    })
  }

  registrar() {
    this.medico.set(null);
    this.isOpenForm.set(true);
  }

  editMedico(numeroDocumento: number) {
    this.medicoService.obtenerMedicoPorId(numeroDocumento).subscribe({
      next: (medico) => {
        this.medico.set(medico);
        this.isOpenForm.set(true);
      }
    });
  }

  deleteMedico(numeroDocumento: number) {
    this.medicoService.eliminarMedico(numeroDocumento).subscribe({
      next: () => {
        this.cargarMedicos();
      }
    });
  }
}
