import { Routes } from '@angular/router';
import { InicioComponent } from './Components/inicio-component/inicio-component';
import { PacientesComponent } from './Components/pacientes-component/pacientes-component';
import { CitasComponent } from './Components/citas-component/citas-component';
import { AgendarCita } from './Components/Modales/agendar-cita/agendar-cita';

export const routes: Routes = [
    {path:'', redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio',component:InicioComponent},
    {path:'pacientes', component:AgendarCita},
    {path:'citas', component:CitasComponent}
];
