import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../Core/Services/auth-service';
import { CitaService } from '../../../Data/Services/cita-service';
import { CitaDTO } from '../../../Data/Interfaces/Cita';
import { EstadoCita } from '../../../Data/Enum/EstadoCita';

@Component({
  selector: 'app-citas-administrador',
  imports: [],
  templateUrl: './citas-administrador.html',
  styleUrl: './citas-administrador.css',
})
export class CitasAdministrador implements OnInit {
  citaService: CitaService = inject(CitaService);
  citas = signal<CitaDTO[]>([]);
  citasTotales = signal<number>(0);
  citasPendientes = signal<number>(0);
  citasCompletadas = signal<number>(0)
  citasCanceladas = signal<number>(0)

  ngOnInit(): void {
    this.citaService.obtenerCitas().subscribe((citas) =>{
      this.citas.set(citas);
      this.citasTotales.set(citas.length);
      this.citasPendientes.set(citas.filter(cita => cita.estado === EstadoCita.PENDIENTE).length);
      this.citasCompletadas.set(citas.filter(cita => cita.estado === EstadoCita.COMPLETADA).length);
      this.citasCanceladas.set(citas.filter(cita => cita.estado === EstadoCita.RECHAZADA).length);
    });
  }

}
