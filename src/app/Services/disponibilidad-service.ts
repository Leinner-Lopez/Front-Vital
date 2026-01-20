import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DisponibilidadDTO, DisponibilidadDtoHoras } from '../Models/Disponibilidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadService {
  httpClient = inject(HttpClient);
  private apiUrl = 'https://localhost:8080/disponibilidad';

  registrarDisponibilidad(disponibilidad: DisponibilidadDTO): Observable<DisponibilidadDTO> {
    return this.httpClient.post<DisponibilidadDTO>(this.apiUrl, disponibilidad);
  }

  medicoDisponibilidad(idMedico: number): Observable<DisponibilidadDTO[]> {
    ;
    return this.httpClient.get<DisponibilidadDTO[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  obtenerBloquesDisponibles(idMedico: number, fecha: string): Observable<DisponibilidadDtoHoras[]> {
    return this.httpClient.get<DisponibilidadDtoHoras[]>(
      `${this.apiUrl}/dia/${idMedico}?fecha=${fecha}`
    );
  }

  eliminarDisponibilidad(idDisponibilidad: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${idDisponibilidad}`);
  }
}
