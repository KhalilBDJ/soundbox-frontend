import { Component, EventEmitter, Input, Output } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import {SoundService} from '../service/sound.service';

@Component({
  selector: 'app-audio-spectrum',
  standalone: true,
  imports: [],
  templateUrl: './audio-spectrum.component.html',
  styleUrls: ['./audio-spectrum.component.css']
})
export class AudioSpectrumComponent {
  private waveSurfer: any;
  private regionsPlugin: any;
  @Input() audioBlob!: Blob | null;
  @Output() regionChange = new EventEmitter<{ start: number; end: number }>();

  constructor(private soundService: SoundService) {} // Injection du service

  ngOnInit() {
    // Initialisation de WaveSurfer avec le plugin Regions
    this.regionsPlugin = RegionsPlugin.create({
      regions: [
        {
          start: 0,
          end: 1.5,
          color: 'rgba(200, 0, 200, 0.5)',
          drag: true,
          resize: true,
        }
      ]
    });

    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      plugins: [this.regionsPlugin],
    });

    this.waveSurfer.load('/assets/audio/wet_fart.mp3');

    this.waveSurfer.on('ready', () => {
      // Obtenir la durée totale de l'audio
      const audioDuration = this.waveSurfer.getDuration();

      this.regionsPlugin.on('region-out', (e: any) => {
        console.log('Region exited');
      });
    });

    // Bouton pour jouer la région sélectionnée
    const playRegionButton = document.getElementById('play-region') as HTMLButtonElement;
    playRegionButton.addEventListener('click', () => {
      this.playRegion();
    });
  }

  private playRegion() {
    const regions = this.waveSurfer.regions.list;
    const regionKeys = Object.keys(regions);

    if (regionKeys.length > 0) {
      const region = regions[regionKeys[0]]; // Utiliser la première région disponible

      console.log(region.end + ' ' + region.start);

      // Convertir l'audio en base64
      if (this.audioBlob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const audioBase64 = (reader.result as string).split(',')[1]; // Récupérer la chaîne Base64 sans préfixe

          // Appeler le service pour envoyer l'audio découpé
          this.soundService.trimAndUploadSound(audioBase64, region.start, region.end).subscribe(
            response => console.log('Audio trimmed and uploaded:', response),
            error => console.error('Error uploading trimmed audio:', error)
          );
        };
        reader.readAsDataURL(this.audioBlob);
      }

      region.play();
    } else {
      console.warn('No regions available to play.');
    }
  }
}
