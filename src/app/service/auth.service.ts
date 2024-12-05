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
  email: string;
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
        localStorage.setItem('userEmail', response.email);
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }
  private userEmail: string = '';

  setUserEmail(email: string): void {
    this.userEmail = email;
  }

  getUserEmail(): string |  null  {
    return localStorage.getItem('userEmail');
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
