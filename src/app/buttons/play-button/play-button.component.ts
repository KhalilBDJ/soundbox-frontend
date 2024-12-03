import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
  standalone: true
})
export class PlayButtonComponent {
  @Input() soundData!: string; // Reçoit les données encodées en Base64 sous forme de string

  async playSound(): Promise<void> {
    if (!this.soundData || this.soundData.length === 0) {
      console.error('Aucune donnée de son disponible pour ce bouton.');
      return;
    }

    try {
      // Décoder Base64 en ArrayBuffer
      const arrayBuffer = this.base64ToArrayBuffer(this.soundData);

      // Jouer l'audio
      const context = new AudioContext();
      const buffer = await context.decodeAudioData(arrayBuffer);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start();
    } catch (error) {
      console.error('Erreur lors de la lecture du son :', error);
    }
  }

  /**
   * Convertit une chaîne Base64 en ArrayBuffer
   * @param base64 La chaîne Base64 à convertir
   * @returns Un ArrayBuffer contenant les données binaires
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
