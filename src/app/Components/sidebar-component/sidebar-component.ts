import { Component, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AgendarCita } from '../Modales/agendar-cita/agendar-cita';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive, AgendarCita],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  modalEstado = model(false);

  dispararApertura() {
    this.modalEstado.set(true);
  }
}
