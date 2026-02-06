import { Component, inject, OnInit, signal } from '@angular/core';
import { Administrador, AdministradorDTO } from '../../../Data/Interfaces/Administrador';
import { AdministradorService } from '../../../Data/Services/administrador-service';
import { RegistrarUsuario } from "../../../Shared/Modales/registrar-usuario/registrar-usuario";

@Component({
  selector: 'app-administradores-administrador',
  imports: [RegistrarUsuario],
  templateUrl: './administradores-administrador.html',
  styleUrl: './administradores-administrador.css',
})
export class AdministradoresAdministrador implements OnInit {
  adminTotales = signal(0);
  administrador = signal<Administrador | null>(null);
  admins = signal<AdministradorDTO[]>([]);
  adminsInactivos = signal<number>(0);
  adminsActivos = signal<number>(0);
  adminService = inject(AdministradorService);
  isOpenForm = signal<boolean>(false);

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores() {
    this.adminService.listarAdministradores().subscribe({
      next: (admins) => {
        this.admins.set(admins);
        this.adminTotales.set(admins.length);
        this.adminsActivos.set(admins.filter(admin => admin.estado === 'ACTIVO').length);
        this.adminsInactivos.set(admins.filter(admin => admin.estado === 'INACTIVO').length);
      }
    })
  }

  registrar(){
    this.administrador.set(null);
    this.isOpenForm.set(true);
  }

  editAdmin(numeroDocumento:number){
    this.adminService.obtenerAdministradorPorId(numeroDocumento).subscribe({
      next: (admin) =>{
        this.administrador.set(admin);
        this.isOpenForm.set(true);
      }
    });
  }

  deleteAdmin(numeroDocumento:number){
    this.adminService.eliminarADministrador(numeroDocumento).subscribe({
      next: () =>{
        this.cargarAdministradores();
      }
    });

  }
}
