import { Routes } from '@angular/router';
import { LoginComponent } from './Features/Auth/login-component/login-component';
import { RegistrationComponent } from './Features/Auth/registration-component/registration-component';
import { authGuard } from './Core/Guards/auth-guard';
import { DashboardAdministradorComponent } from './Features/Administrador/dashboard-administrador-component/dashboard-administrador-component';
import { DashboardMedicoComponent } from './Features/Medico/dashboard-medico-component/dashboard-medico-component';
import { DashboardPacienteComponent } from './Features/Paciente/dashboard-paciente-component/dashboard-paciente-component';
import { roleGuard } from './Core/Guards/role-guard';
import { InicioComponent } from './Features/Medico/inicio-component/inicio-component';
import { PacientesComponent } from './Features/Medico/pacientes-component/pacientes-component';
import { CitasComponent } from './Features/Medico/citas-component/citas-component';
import { InicioAdministrador } from './Features/Administrador/inicio-administrador/inicio-administrador';
import { MedicosAdministrador } from './Features/Administrador/medicos-administrador/medicos-administrador';
import { PacientesAdministrador } from './Features/Administrador/pacientes-administrador/pacientes-administrador';
import { CitasAdministrador } from './Features/Administrador/citas-administrador/citas-administrador';
import { AdministradoresAdministrador } from './Features/Administrador/administradores-administrador/administradores-administrador';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'registrarse', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: DashboardAdministradorComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_ADMINISTRADOR'] },
        children: [
            {path: 'inicio', component: InicioAdministrador},
            {path: 'medicos', component: MedicosAdministrador},
            {path: 'pacientes', component: PacientesAdministrador},
            {path: 'administradores', component: AdministradoresAdministrador},
            {path: 'citas', component: CitasAdministrador},
            {path: '', redirectTo: 'inicio', pathMatch: 'full'}
        ]
    },
    {
        path: 'medico',
        component: DashboardMedicoComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_MEDICO'] },
        children: [
            { path: 'inicio', component: InicioComponent },     
            { path: 'pacientes', component: PacientesComponent }, 
            { path: 'citas', component: CitasComponent },        
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
    },
    {
        path: 'paciente',
        component: DashboardPacienteComponent,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PACIENTE'] },
        children: [

        ]
    },
];
