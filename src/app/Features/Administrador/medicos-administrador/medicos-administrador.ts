import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicoService } from '../../../Data/Services/medico-service';
import { MedicoDTO } from '../../../Data/Interfaces/Medico';

@Component({
  selector: 'app-medicos-administrador',
  imports: [],
  templateUrl: './medicos-administrador.html',
  styleUrl: './medicos-administrador.css',
})
export class MedicosAdministrador implements OnInit {


  medicoService: MedicoService = inject(MedicoService);
  medicosTotales = signal<number>(0);
  medicos = signal<MedicoDTO[]>([]);

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicos) => {
        this.medicos.set(medicos);
        this.medicosTotales.set(medicos.length);
      }
    })
  }
}
