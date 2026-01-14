import { Component, model, computed } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-agendar-cita',
  imports: [MatDatepickerModule, MatCardModule, MatNativeDateModule],
  templateUrl: './agendar-cita.html',
  styleUrl: './agendar-cita.css',
})
export class AgendarCita {
  isOpen = model(false);
}
