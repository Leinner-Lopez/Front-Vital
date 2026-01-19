import { Routes } from '@angular/router';
import { InicioComponent } from './Components/Dashboard-Components/inicio-component/inicio-component';
import { PacientesComponent } from './Components/Dashboard-Components/pacientes-component/pacientes-component';
import { CitasComponent } from './Components/Dashboard-Components/citas-component/citas-component';
import { LoginComponent } from './Components/login-component/login-component';
import { DashboardLayoutComponent } from './Components/dashboard-layout-component/dashboard-layout-component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'inicio',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: InicioComponent },
            { path: 'pacientes', component: PacientesComponent },
            { path: 'citas', component: CitasComponent }
        ]
    },
];
