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
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        // Stocker le token dans le localStorage
        localStorage.setItem('authToken', response.token);
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Vérifier si un utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
