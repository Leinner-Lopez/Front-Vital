import { Component, computed, inject, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../Core/Services/auth-service';
import { MenuItem } from '../../Data/Interfaces/MenuItem';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  modalEstado = model(false);
  authService = inject(AuthService);

  menuItems = computed<MenuItem[]>(() => {
    const role = this.authService.userRole();

    if (role === 'ROLE_ADMINISTRADOR') {
      return [
        { label: 'Inicio', icon: 'home', route: '/admin/inicio' },
        { label: 'Pacientes', icon: 'user', route: '/admin/pacientes' },
        { label: 'Médicos', icon: 'doctor', route: '/admin/medicos' },
        { label: 'Administradores', icon: 'admin', route: '/admin/administradores' },
        { label: 'Citas', icon: 'clock', route: '/admin/citas' },
        { label: 'Reportes', icon: 'stats', route: '/admin/reportes' }
      ];
    }

    if (role === 'ROLE_MEDICO') {
      return [
        { label: 'Inicio', icon: 'home', route: '/medico/inicio' },
        { label: 'Pacientes', icon: 'users', route: '/medico/pacientes' },
        { label: 'Citas', icon: 'clock', route: '/medico/citas' },
        { label: 'Disponibilidad', icon: 'calendar-check', route: '/medico/disponibilidad' }
      ];
    }
    return [
      { label: 'Inicio', icon: 'home', route: '/paciente/inicio' },
      { label: 'Citas', icon: 'clock', route: '/paciente/citas' },
      { label: 'Médicos', icon: 'users', route: '/paciente/medicos' },
    ];
  });

  logOut() {
    this.authService.logout();
  }

  dispararApertura() {
    this.modalEstado.set(true);
  }
}
