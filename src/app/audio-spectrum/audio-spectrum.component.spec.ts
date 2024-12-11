import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';

@Component({
  selector: 'app-audio-spectrum',
  standalone: true,
  imports: [],
  templateUrl: './audio-spectrum.component.html',
  styleUrls: ['./audio-spectrum.component.css']
})
export class AudioSpectrumComponent implements OnInit {
  private waveSurfer: any;
  private activeRegion: any;

  ngOnInit() {
    // Initialisation de WaveSurfer avec le plugin Regions
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: '/assets/audio/wet_fart.mp3',
      plugins: [
        RegionsPlugin.create()
      ],
    });

    this.waveSurfer.on('ready', () => {
      const audioDuration = this.waveSurfer.getDuration();

      // Créer une région couvrant toute la durée de l'audio
      this.activeRegion = this.waveSurfer.addRegion({
        start: 0,
        end: audioDuration,
        color: 'rgba(200, 0, 200, 0.5)',
        drag: true,
        resize: true,
      });
    });

    // Mettre à jour la région active lorsqu'une région est modifiée
    this.waveSurfer.on('region-update-end', (region: any) => {
      this.activeRegion = region;
    });

    // Surveiller la position de lecture pour stopper à la fin de la région (optionnel)
    this.waveSurfer.on('audioprocess', () => {
      if (this.activeRegion) {
        const currentTime = this.waveSurfer.getCurrentTime();
        if (currentTime > this.activeRegion.end) {
          this.waveSurfer.pause();
          // Si vous voulez remettre la lecture au début de la région après l'arrêt :
          // this.waveSurfer.seekTo(this.activeRegion.start / this.waveSurfer.getDuration());
        }
      }
    });

    // Bouton pour jouer la région sélectionnée
    const playRegionButton = document.getElementById('play-region') as HTMLButtonElement;
    playRegionButton.addEventListener('click', () => {
      this.playRegion();
    });
  }

  private playRegion() {
    if (this.activeRegion) {
      // Jouer seulement la région active
      this.waveSurfer.play(this.activeRegion.start, this.activeRegion.end);
    } else {
      console.warn('Aucune région disponible pour la lecture.');
    }
  }
}
