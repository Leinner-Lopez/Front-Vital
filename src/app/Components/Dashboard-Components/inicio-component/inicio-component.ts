import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AgendarCita } from "../../Modales/agendar-cita/agendar-cita";
import { AuthService } from '../../../Services/auth-service';
import { Administrador } from '../../../Models/Administrador';
import { AdministradorService } from '../../../Services/administrador-service';


@Component({
  selector: 'app-inicio-component',
  imports: [AgendarCita],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent implements OnInit {

  administrador = signal<Administrador | null>(null);
  nombreAdministrador = computed(() => this.administrador()?.nombres || 'Cargando...');
  numeroDocumento = computed(() => this.administrador()?.numeroDocumento || 'Cargando...');
  modalEstado = signal(false);
  authService: AuthService = inject(AuthService);
  administradorService = inject(AdministradorService);

  ngOnInit(): void {
    const id = this.authService.getUserId();
    if (id) {
      this.administradorService.obtenerAdministradorPorId(id).subscribe({
        next: (data) => this.administrador.set(data),
        error: (err) => console.error('Error CORS o de red:', err)
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
