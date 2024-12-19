import {Component, Input} from '@angular/core';
import {Sound} from '../../service/sound.service';

@Component({
  selector: 'app-download-button',
  standalone: true,
  imports: [],
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent {

  @Input() sound!: Sound;

  downloadSound(): void {
    // Vérifie si le son contient des données
    if (!this.sound || !this.sound.data) {
      console.error('Aucune donnée à télécharger pour ce son.');
      return;
    }

    // Convertir la chaîne Base64 en blob
    const byteString = atob(this.sound.data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'audio/mpeg' }); // ou un autre type MIME si nécessaire

    // Créer une URL pour le blob
    const url = URL.createObjectURL(blob);

    // Créer un élément <a> temporaire pour déclencher le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.sound.name}.mp3`; // Nom du fichier
    a.click();

    // Libérer l'URL pour éviter les fuites de mémoire
    URL.revokeObjectURL(url);
  }
}
