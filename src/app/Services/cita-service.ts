import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CitaDTO } from '../Models/Cita';
import { Observable } from 'rxjs';
import { EstadoCita } from '../Models/EstadoCita';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/citas';

  public agendarCita(cita: CitaDTO): Observable<CitaDTO> {
    return this.httpClient.post<CitaDTO>(this.apiUrl, cita);
  }

  public obtenerCitas(): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(this.apiUrl);
  }

  public obtenerCitasAceptadas(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/aceptadas/${id}`);
  }

  public obtenerCitasCompletadas(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/completadas/${id}`);
  }

  public obtenerCitasPendientes(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/pendientes/${id}`);
  }

  obtenerCitasPaciente(id: number): Observable<CitaDTO[]> {
    return this.httpClient.get<CitaDTO[]>(`${this.apiUrl}/paciente/${id}`);
  }

  actualizarCita(id: number, estadoCita: EstadoCita): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`,estadoCita);
  }

  eliminarCita(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
