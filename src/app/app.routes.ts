import { Routes } from '@angular/router';
import { InicioComponent } from './Components/Dashboard-Components/inicio-component/inicio-component';
import { PacientesComponent } from './Components/Dashboard-Components/pacientes-component/pacientes-component';
import { CitasComponent } from './Components/Dashboard-Components/citas-component/citas-component';
import { LoginComponent } from './Components/login-component/login-component';
import { DashboardLayoutComponent } from './Components/dashboard-layout-component/dashboard-layout-component';
import { RegistrationComponent } from './Components/registration-component/registration-component';
import { authGuard } from './Auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'registrarse', component: RegistrationComponent},
    { path: 'login', component: LoginComponent },
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
