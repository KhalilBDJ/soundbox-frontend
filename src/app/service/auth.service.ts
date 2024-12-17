import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface LoginRequestDTO {
  email: string;
  password: string;
}

interface LoginResponseDTO {
  id: number;
  username: string;
  jwtToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        localStorage.setItem('authToken', response.jwtToken);
        localStorage.setItem('username', response.username);
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Méthode d'inscription
  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      map((response) => {
        console.log('User registered successfully:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  private userEmail: string = '';

  setUsername(username: string): void {
    this.userEmail = username;
  }

  getUsername(): string |  null  {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Vérifier si un utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }
}
