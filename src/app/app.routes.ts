import { Routes } from '@angular/router';
import { LoginComponent } from './Features/Auth/login-component/login-component';
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
];
