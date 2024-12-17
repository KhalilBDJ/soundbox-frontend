import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Sound {
  id: number;
  name: string;
  duration: number;
  data: string; // Base64 string
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

  uploadSoundFromYouTube(youtubeUrl: string, name: string): Observable<{ message: string; name: string }> {
    return this.http.post<{ message: string; name: string }>(
      `${this.apiUrl}/user/youtube`,
      null,
      {
        params: { url: youtubeUrl, name }, // Ajout du paramètre `name`
      }
    );
  }

  // Méthode existante pour uploader un fichier
  uploadSoundFileToUser(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/user/`, formData);
  }

  // Méthode existante pour mettre à jour le nom
  updateSoundName(soundId: number, newName: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/user/${soundId}`, { name: newName });
  }

  // Méthode existante pour supprimer un son
  deleteSound(soundId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${soundId}`);
  }

  getYouTubePreview(youtubeUrl: string): Observable<{ audioBlob: Blob; name: string; duration: number }> {
    return this.http.post<{ name: string; duration: number; audioData: string }>(
      `${this.apiUrl}/user/youtube/preview`,
      null,
      { params: { url: youtubeUrl } }
    ).pipe(
      map((response) => {
        // Convertir le Base64 en Blob
        const binaryString = window.atob(response.audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const audioBlob = new Blob([bytes], { type: 'audio/mp3' });

        return {
          audioBlob: audioBlob,
          name: response.name,
          duration: response.duration,
        };
      })
    );
  }


  trimAndUploadSound(audioBase64: string, start: number, end: number): Observable<{ trimmed_audio_base64: string }> {
    return this.http.post<{ trimmed_audio_base64: string }>(`${this.apiUrl}/trim`, {
      audioBase64,
      start,
      end,
    });
  }
  uploadSoundBytes(soundData: { data: string; name: string; duration: number }): Observable<{ message: string; name: string }> {
    return this.http.post<{ message: string; name: string }>(`${this.apiUrl}/user/bytes`, soundData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
