import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sound {
  id: number;
  name: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private apiUrl = 'http://localhost:8080/sounds';

  constructor(private http: HttpClient) {}

  // Récupérer les sons de l'utilisateur connecté
  getUserSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>(`${this.apiUrl}/user/me`);
  }
}
