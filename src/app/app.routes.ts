import { Routes } from '@angular/router';
import { InicioComponent } from './Features/Medico/inicio-component/inicio-component';
import { PacientesComponent } from './Features/Medico/pacientes-component/pacientes-component';
import { CitasComponent } from './Features/Medico/citas-component/citas-component';
import { LoginComponent } from './Features/Auth/login-component/login-component';
import { DashboardLayoutComponent } from './Components/dashboard-layout-component/dashboard-layout-component';
import { RegistrationComponent } from './Features/Auth/registration-component/registration-component';
import { authGuard } from './Core/Guards/auth-guard';
import { DashboardAdministradorComponent } from './Features/Administrador/dashboard-administrador-component/dashboard-administrador-component';
import { DashboardMedicoComponent } from './Features/Medico/dashboard-medico-component/dashboard-medico-component';
import { DashboardPacienteComponent } from './Features/Paciente/dashboard-paciente-component/dashboard-paciente-component';
import { roleGuard } from './Core/Guards/role-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'registrarse', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'admin',
        component:DashboardAdministradorComponent,
        canActivate: [authGuard,roleGuard],
        data: { roles: 'ROLE_ADMINISTRADOR' },
        children:[

        ]
    },
        {
        path: 'medico',
        component:DashboardMedicoComponent,
        canActivate: [authGuard,roleGuard],
        data: { roles: 'ROLE_MEDICO' },
        children:[

        ]
    },
        {
        path: 'paciente',
        component:DashboardPacienteComponent,
        canActivate: [authGuard,roleGuard],
        data: { roles: 'ROLE_PACIENTE' },
        children:[

        ]
    },
    {
        path: 'inicio',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: InicioComponent },
            { path: 'pacientes', component: PacientesComponent },
            { path: 'citas', component: CitasComponent }
        ]
    },
];
