import { Component, inject, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AgendarCita } from '../Modales/agendar-cita/agendar-cita';
import { AuthService } from '../../Core/Services/auth-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive, AgendarCita],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  modalEstado = model(false);
  authService = inject(AuthService);

  logOut(){
    this.authService.logout();
  }

  dispararApertura() {
    this.modalEstado.set(true);
  }
}
