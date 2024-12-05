import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sound {
  id: number;
  name: string;
  duration: number;
  data: string; // Assurez-vous que le type est correct
}
@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private apiUrl = 'http://localhost:8080/sounds';

  constructor(private http: HttpClient) {}

  getUserSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>(`${this.apiUrl}/user/me`);
  }

  // Nouvelle méthode pour ajouter un son depuis une URL YouTube
  uploadSoundFromYouTube(youtubeUrl: string): Observable<{ message: string; name: string }> {
    return this.http.post<{ message: string; name: string }>(`${this.apiUrl}/user/youtube`, null, {
      params: { url: youtubeUrl },
    });
  }

}
