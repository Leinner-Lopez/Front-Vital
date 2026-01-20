import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../Models/Paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:8080/paciente';

  registrarPaciente(paciente:Paciente):Observable<Paciente>{
    return this.httpClient.post<Paciente>(this.apiUrl, paciente);
  }

  obtenerPacientes():Observable<Paciente[]>{
    return this.httpClient.get<Paciente[]>(this.apiUrl);
  }

  obtenerPacientePorId(id:number):Observable<Paciente>{
    return this.httpClient.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  actualizarPaciente(paciente:Paciente):Observable<Paciente>{
    return this.httpClient.put<Paciente>(this.apiUrl, paciente);
  }

  eliminarPaciente(id:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
