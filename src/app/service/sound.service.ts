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

  // Méthode existante pour upload depuis YouTube (sans preview)
  uploadSoundFromYouTube(youtubeUrl: string): Observable<{ message: string; name: string }> {
    return this.http.post<{ message: string; name: string }>(
      `${this.apiUrl}/user/youtube`,
      null,
      {
        params: { url: youtubeUrl },
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

  /**
   * Nouvelle méthode pour obtenir un aperçu audio depuis une URL YouTube.
   * Cet endpoint doit renvoyer un blob audio et les métadonnées dans les en-têtes.
   */
  getYouTubePreview(youtubeUrl: string): Observable<{ audioBlob: Blob, name: string, duration: number }> {
    return this.http.post(`${this.apiUrl}/user/youtube/preview`, null, {
      params: { url: youtubeUrl },
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        const name = response.headers.get('x-audio-name') || 'Untitled';
        const duration = Number(response.headers.get('x-audio-duration') || 0);
        const audioBlob = response.body as Blob;
        return { audioBlob, name, duration };
      })
    );
  }

  /**
   * Nouvelle méthode pour uploader le son croppé.
   * Le backend effectuera le trimming en fonction des paramètres start/end et sauvegardera le résultat.
   */
  uploadCroppedSound(formData: FormData): Observable<string> {
    // Assurez-vous que le backend a un endpoint tel que /sounds/user/trim
    // qui traite les données, découpe l'audio et l'enregistre
    return this.http.post<string>(`${this.apiUrl}/user/trim`, formData);
  }
}
