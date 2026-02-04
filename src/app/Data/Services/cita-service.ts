import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CitaDTO } from '../Interfaces/Cita';
import { Observable } from 'rxjs';
import { EstadoCita } from '../Enum/EstadoCita';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/citas`;

  agendarCita(cita: CitaDTO): Observable<CitaDTO> {
    return this.httpClient.post<CitaDTO>(this.apiUrl, cita);
  }

  obtenerCitas(): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(this.apiUrl);
  }

  obtenerCitasPorEstado(estado: EstadoCita): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/cita?estado=${estado}`);
  }

  obtenerCitasMedico(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/medico/${id}`);
  }

  obtenerCitasMedicoPorEstado(id: number, estado: EstadoCita): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/medico/${id}/estado?estado=${estado}`);
  }

  obtenerCitasPaciente(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/paciente/${id}`);
  }

  obtenerCitasPacientePorEstado(id: number, estado: EstadoCita): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/paciente/${id}/estado?estado=${estado}`);
  }

  actualizarCita(id: number, estadoCita: EstadoCita): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, estadoCita);
  }

  eliminarCita(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
