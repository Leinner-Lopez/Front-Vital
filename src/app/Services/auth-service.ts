import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LoginRequest } from '../Models/LoginRequest';
import { tap } from 'rxjs';
import { jwtDecode} from 'jwt-decode';
import { MyJwtPayload } from '../Auth/MyJwtPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpCLient = inject(HttpClient);
  router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:8080/auth';

  token = signal<string | null>(null);
  userRole = signal<string | null>(null);
  userId = signal<number | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedToken = sessionStorage.getItem('token');

      if (savedToken && !this.isTokenExpired(savedToken)) {
        this.token.set(savedToken);
        this.isAuthenticated.set(true);
      } else {
        this.logout();
      }
    } else {
      this.token.set(null);
      this.isAuthenticated.set(false);
    }
  }

  login(credenciales: LoginRequest) {
    return this.httpCLient.post<{ token: string }>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(respuesta => {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('token', respuesta.token);
        }
        this.token.set(respuesta.token);
        this.isAuthenticated.set(true);
        const decodedToken: MyJwtPayload | null = this.decodeToken(respuesta.token);
        if(decodedToken){
          this.userRole.set(decodedToken.role);
          this.userId.set(decodedToken.sub ? parseInt(decodedToken.sub) : null);
        }
      })
    )
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
    }
    this.token.set(null);
    this.isAuthenticated.set(false);
    this.userRole.set(null);
    this.userId.set(null);
    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  isTokenExpired(Token: string | null): boolean {
    if (!Token) return true;

    try {
      const decodedToken: any = this.decodeToken(Token);
      return Math.floor(Date.now() / 1000) >= decodedToken.exp;
    } catch (error) {
      return true;
    }
  }

  private decodeToken(Token: string | null) :MyJwtPayload | null{
    if (!Token) return null;
    try {
      return jwtDecode(Token);
    } catch (error) {
      return null;
    }
  }

  getToken() {
    return this.token();
  }

  getUserRole() {
    return this.userRole();
  }
  
  getUserId() {
    return this.userId();
  }
  
}
