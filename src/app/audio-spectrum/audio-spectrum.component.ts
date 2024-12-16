import { Component, EventEmitter, Input, Output } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import { SoundService } from '../service/sound.service';

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

    console.log(this.audioBlob)

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

    this.waveSurfer.loadBlob(this.audioBlob);



    this.waveSurfer.on('ready', () => {
      // Obtenir la durée totale de l'audio
      const audioDuration = this.waveSurfer.getDuration();
      console.log(audioDuration)

      this.waveSurfer.on('region-update-end', (region: any) => {
        console.log('Region updated:', region.start, region.end);
        this.regionChange.emit({ start: region.start, end: region.end });
      });
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

  private loadAudioBlob(url: string) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch audio from ${url}`);
        }
        return response.blob();
      })
      .then(blob => {
        this.audioBlob = blob;
        console.log('Audio blob loaded:', this.audioBlob);
      })
      .catch(error => {
        console.error('Error loading audio blob:', error);
      });
  }

  private playRegion() {
    const regions = this.waveSurfer.regions.list;
    const regionKeys = Object.keys(regions);

    if (regionKeys.length > 0) {
      const region = regions[regionKeys[0]]; // Utiliser la première région disponible

      console.log(region.end + ' ' + region.start);
      region.play();
    } else {
      console.warn('No regions available to play.');
    }
  }
}
