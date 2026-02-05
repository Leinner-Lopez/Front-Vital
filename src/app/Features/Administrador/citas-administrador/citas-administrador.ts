import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../Core/Services/auth-service';
import { CitaService } from '../../../Data/Services/cita-service';
import { CitaDTO } from '../../../Data/Interfaces/Cita';
import { EstadoCita } from '../../../Data/Enum/EstadoCita';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-citas-administrador',
  imports: [DatePipe],
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
    this.citaService.obtenerCitas().subscribe((citas) => {
      this.citas.set(citas);
      this.citasTotales.set(citas.length);
      this.citasPendientes.set(citas.filter(cita => cita.estado === EstadoCita.PENDIENTE).length);
      this.citasCompletadas.set(citas.filter(cita => cita.estado === EstadoCita.COMPLETADA).length);
      this.citasCanceladas.set(citas.filter(cita => cita.estado === EstadoCita.RECHAZADA).length);
    });
  }

  díasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  getFechaFormateada(Fecha:string): string {
    const fecha: Date = new Date(Fecha);
    const diaSemana: string = this.díasSemana[fecha.getDay()];
    const dia: number = fecha.getDate();
    const mes: string = fecha.toLocaleDateString('es-ES', { month: 'long' });
    return `${diaSemana}, ${dia} de ${mes}`;
  }

}

