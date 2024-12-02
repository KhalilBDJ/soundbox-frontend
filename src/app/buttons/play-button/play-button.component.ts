import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
  standalone: true
})
export class PlayButtonComponent {
  @Input() soundData!: Uint8Array; // Accepte les données du son sous forme de byte[]

  playSound(): void {
    if (this.soundData) {
      // Convertir le byte array en un objet AudioBufferSourceNode
      const audioContext = new AudioContext();
      const arrayBuffer = this.soundData.buffer;

      // Décoder les données audio
      audioContext.decodeAudioData(arrayBuffer).then((audioBuffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0); // Joue le son
      }).catch((error) => {
        console.error('Erreur lors de la lecture du son :', error);
      });
    } else {
      console.error('Aucune donnée de son disponible pour ce bouton.');
    }
  }
}
