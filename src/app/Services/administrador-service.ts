import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Administrador, AdministradorDTO } from '../Models/Administrador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  httClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/administrador';

  registrarAdministrador(administrador: Administrador):Observable<Administrador> {
    return this.httClient.post<Administrador>(this.apiUrl,administrador)
  }

  listarAdministradores(): Observable<AdministradorDTO[]> {
    return this.httClient.get<AdministradorDTO[]>(this.apiUrl);
  }

  obtenerAdministradorPorId(id: number): Observable<Administrador> {
    return this.httClient.get<Administrador>(`${this.apiUrl}/${id}`);
  }

  eliminarADministrador(id: number): Observable<void> {
    return this.httClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.httClient.put<Administrador>(this.apiUrl, administrador);
  }
}
