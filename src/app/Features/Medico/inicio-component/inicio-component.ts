import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AgendarCita } from "../../../Shared/Modales/agendar-cita/agendar-cita";
import { AuthService } from '../../../Core/Services/auth-service';
import { Medico } from '../../../Data/Interfaces/Medico';
import { MedicoService } from '../../../Data/Services/medico-service';
import { CitaService } from '../../../Data/Services/cita-service';
import { DatePipe } from '@angular/common';
import { CitaDTO } from '../../../Data/Interfaces/Cita';


@Component({
  selector: 'app-inicio-component',
  imports: [AgendarCita, DatePipe],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent implements OnInit {

  medico = signal<Medico | null>(null);
  nombreMedico = computed(() => this.medico()?.nombres);
  numeroDocumento = computed(() => this.authService.getUserId());
  filtroActual = signal<'Pendientes' | 'Completadas'>('Pendientes');
  citasHoy = signal<number>(100);
  citas = signal<CitaDTO[]>([]);

  modalEstado = signal(false);

  authService: AuthService = inject(AuthService);
  medicoService: MedicoService = inject(MedicoService);
  citaService: CitaService = inject(CitaService);

  ngOnInit(): void {
    if (this.numeroDocumento()) {
      this.medicoService.obtenerMedicoPorId(this.numeroDocumento()!).subscribe({
        next: (data) => this.medico.set(data),
        error: (err) => console.error('Error CORS o de red:', err)
      });
      this.cargarCitas(this.filtroActual());
    }
  }


//Cargar citas según el filtro
  cargarCitas(filtro: string): void {
    if (filtro === 'Pendientes') {
      this.citaService.obtenerCitasAceptadas(this.numeroDocumento()!).subscribe({
        next: (citas) => {
          const hoy = new Date();
          this.citas.set(citas.filter(cita => {
            const fechaCita = new Date(cita.fechaCita);
            return fechaCita.getDate() === hoy.getDate() &&
              fechaCita.getMonth() === hoy.getMonth() &&
              fechaCita.getFullYear() === hoy.getFullYear();
          }));
          this.citasHoy.set(this.citas().length);
        }
      });
    } else {
      this.citaService.obtenerCitasCompletadas(this.numeroDocumento()!).subscribe({
        next: (citas) => {
          const hoy = new Date();
          this.citas.set(citas.filter(cita => {
            const fechaCita = new Date(cita.fechaCita);
            return fechaCita.getDate() === hoy.getDate() &&
              fechaCita.getMonth() === hoy.getMonth() &&
              fechaCita.getFullYear() === hoy.getFullYear();
          }));
        }
      });
    }
  }


  cambiarFiltro(nuevoFiltro: 'Pendientes' | 'Completadas'): void {
    if (this.filtroActual() === nuevoFiltro) return;
    this.filtroActual.set(nuevoFiltro);
    this.cargarCitas(this.filtroActual());
  }

  díasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  fechaFormateada = this.getFechaFormateada();

  dispararApertura() {
    this.modalEstado.set(true);
  }

  getFechaFormateada(): string {
    const fecha: Date = new Date();
    const diaSemana: string = this.díasSemana[fecha.getDay()];
    const dia: number = fecha.getDate();
    const mes: string = fecha.toLocaleDateString('es-ES', { month: 'long' });
    return `${diaSemana}, ${dia} de ${mes}`;
  }

}
