import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../Shared/sidebar-component/sidebar-component";

@Component({
  selector: 'app-dashboard-administrador-component',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-administrador-component.html',
  styleUrl: './dashboard-administrador-component.css',
})
export class DashboardAdministradorComponent {

}
