import { Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio-component/inicio-component';
import { PacientesComponent } from './Components/pacientes-component/pacientes-component';
import { CitasComponent } from './Components/citas-component/citas-component';

export const routes: Routes = [
    {path:'', redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio',component:InicioComponent},
    {path:'pacientes', component:PacientesComponent},
    {path:'citas', component:CitasComponent}
];
