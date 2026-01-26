import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AgendarCita } from "../../../Shared/Modales/agendar-cita/agendar-cita";
import { AuthService } from '../../../Core/Services/auth-service';
import { AdministradorService } from '../../../Data/Services/administrador-service';
import { Medico } from '../../../Data/Interfaces/Medico';
import { MedicoService } from '../../../Data/Services/medico-service';
import { CitaService } from '../../../Data/Services/cita-service';


@Component({
  selector: 'app-inicio-component',
  imports: [AgendarCita],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent implements OnInit {

  medico = signal<Medico | null>(null);
  nombreMedico = computed(() => this.medico()?.nombres || 'Cargando...');
  numeroDocumento = computed(() => this.medico()?.numeroDocumento || 'Cargando...');
  citasHoy = signal<number>(2);

  modalEstado = signal(false);

  authService: AuthService = inject(AuthService);
  medicoService = inject(MedicoService);
  citaService = inject(CitaService);

  ngOnInit(): void {
    const id = this.authService.getUserId();
    if (id) {
      this.medicoService.obtenerMedicoPorId(id).subscribe({
        next: (data) => this.medico.set(data),
        error: (err) => console.error('Error CORS o de red:', err)
      });
      this.citaService.obtenerCitasAceptadas(id).subscribe({
        next: (citas) => {
          const hoy = new Date();
          this.citasHoy.set(citas.filter(cita => {
            const fechaCita = new Date(cita.fechaCita);
            return fechaCita.getDate() === hoy.getDate() &&
              fechaCita.getMonth() === hoy.getMonth() &&
              fechaCita.getFullYear() === hoy.getFullYear();
          }).length);
        }
      });
    }
  }

  díasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  fechaFormateada = this.getFechaFormateada();

  dispararApertura() {
    this.modalEstado.set(true);
    console.log(this.authService.getUserId());
  }

  getFechaFormateada(): string {
    const fecha: Date = new Date();
    const diaSemana: string = this.díasSemana[fecha.getDay()];
    const dia: number = fecha.getDate();
    const mes: string = fecha.toLocaleDateString('es-ES', { month: 'long' });
    return `${diaSemana}, ${dia} de ${mes}`;
  }

}
