import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpCLient = inject(HttpClient);
  private apiUrl = 'https://localhost:8080/auth';

  login(){
    
  }
}
