import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Administrador } from '../../../Data/Interfaces/Administrador';
import { CitaDTO } from '../../../Data/Interfaces/Cita';
import { AuthService } from '../../../Core/Services/auth-service';
import { AdministradorService } from '../../../Data/Services/administrador-service';
import { CitaService } from '../../../Data/Services/cita-service';
import { EstadoCita } from '../../../Data/Enum/EstadoCita';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio-administrador',
  imports: [DatePipe],
  templateUrl: './inicio-administrador.html',
  styleUrl: './inicio-administrador.css',
})
export class InicioAdministrador implements OnInit {

  admin = signal<Administrador | null>(null);
  numeroDocumento = computed(() => this.authService.getUserId());
  filtroActual = signal<'Pendientes' | 'Completadas'>('Pendientes');
  nombreAdmin = computed(() => this.admin()?.nombres);
  citasHoy = signal<number>(100);
  citas = signal<CitaDTO[]>([]);


  authService = inject(AuthService);
  adminService = inject(AdministradorService);
  citaService = inject(CitaService);

  ngOnInit(): void {
    if (this.numeroDocumento()) {
      this.adminService.obtenerAdministradorPorId(this.numeroDocumento()!).subscribe({
        next: (data) => this.admin.set(data),
        error: (err) => console.error('Error CORS o de red:', err)
      });
    }
    this.cargarCitas(this.filtroActual());
  }

  cargarCitas(filtro: string): void {
    if (filtro === 'Pendientes') {
      this.citaService.obtenerCitasPorEstado(EstadoCita.ACEPTADA).subscribe({
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
      })
    } else {
      this.citaService.obtenerCitasPorEstado(EstadoCita.COMPLETADA).subscribe({
        next: (citas) => {
          const hoy = new Date();
          this.citas.set(citas.filter(cita => {
            const fechaCita = new Date(cita.fechaCita);
            return fechaCita.getDate() === hoy.getDate() &&
              fechaCita.getMonth() === hoy.getMonth() &&
              fechaCita.getFullYear() === hoy.getFullYear();
          }));
        }
      })
    }
  }


  cambiarFiltro(nuevoFiltro: 'Pendientes' | 'Completadas'): void {
    if (this.filtroActual() === nuevoFiltro) return;
    this.filtroActual.set(nuevoFiltro);
    this.cargarCitas(this.filtroActual());
  }

  díasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  fechaFormateada = this.getFechaFormateada();

  getFechaFormateada(): string {
    const fecha: Date = new Date();
    const diaSemana: string = this.díasSemana[fecha.getDay()];
    const dia: number = fecha.getDate();
    const mes: string = fecha.toLocaleDateString('es-ES', { month: 'long' });
    return `${diaSemana}, ${dia} de ${mes}`;
  }

}
