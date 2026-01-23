import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../Shared/sidebar-component/sidebar-component";

@Component({
  selector: 'app-dashboard-medico-component',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard-medico-component.html',
  styleUrl: './dashboard-medico-component.css',
})
export class DashboardMedicoComponent {
  
}
