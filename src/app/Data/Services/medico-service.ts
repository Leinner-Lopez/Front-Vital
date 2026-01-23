import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Medico, MedicoDTO } from '../Interfaces/Medico';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/medico`;

  registrarMedico(medico: Medico): Observable<Medico> {
    return this.httpClient.post<Medico>(this.apiUrl, medico);
  }

  obtenerMedicos(): Observable<MedicoDTO[]> {
    return this.httpClient.get<MedicoDTO[]>(this.apiUrl);
  }

  obtenerMedicoPorId(id: number): Observable<Medico> {
    return this.httpClient.get<Medico>(`${this.apiUrl}/${id}`);
  }

  obtenerMedicosPorEspecialidad(especialidad: string): Observable<MedicoDTO[]> {
    return this.httpClient.get<MedicoDTO[]>(`${this.apiUrl}/medicos?especialidad=${especialidad}`);
  }

  actualizarMedico(medico: Medico): Observable<Medico> {
    return this.httpClient.put<Medico>(this.apiUrl, medico);
  }

  eliminarMedico(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
