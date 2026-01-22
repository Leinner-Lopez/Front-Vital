import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LoginRequest } from '../Models/LoginRequest';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpCLient = inject(HttpClient);
  router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = '  http://localhost:8080/auth';

  token = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    const initialToken = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    this.token.set(initialToken);
    this.isAuthenticated.set(!!initialToken);
  }

  login(credenciales:LoginRequest){
    return this.httpCLient.post<{token:string}>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(respuesta => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', respuesta.token);
        }
        this.token.set(respuesta.token);
      })
    )
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  getToken(){
    return this.token();
  }
}
