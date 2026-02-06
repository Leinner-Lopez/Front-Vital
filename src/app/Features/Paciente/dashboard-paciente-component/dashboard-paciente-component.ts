import { Component } from '@angular/core';
import { SidebarComponent } from "../../../Shared/sidebar-component/sidebar-component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-paciente-component',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-paciente-component.html',
  styleUrl: './dashboard-paciente-component.css',
})
export class DashboardPacienteComponent {

}
