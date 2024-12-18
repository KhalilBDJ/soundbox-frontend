import { Component, EventEmitter, Input, Output } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

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
  @Input() audioBlob!: Blob | null; // Audio passé en entrée
  @Output() regionChange = new EventEmitter<{ start: number; end: number }>();

  ngOnInit() {
    this.initializeWaveSurfer();
  }

  /** Initialise WaveSurfer avec ses paramètres */
  private initializeWaveSurfer() {
    this.regionsPlugin = RegionsPlugin.create({});
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      plugins: [this.regionsPlugin],
    });

    // Charger l'audio une fois prêt
    this.waveSurfer.loadBlob(this.audioBlob);

    this.waveSurfer.on('ready', () => {
      this.addInitialRegion();
    });

    this.setupZoomControl();
    this.setupPlayRegionButton();

    const stopRegionButton = document.getElementById('stop-region') as HTMLButtonElement;
    stopRegionButton.addEventListener('click', () => this.stopPlayback());

  }

  /** Crée une région par défaut à 20%-80% de la durée */
  private addInitialRegion() {
    const audioDuration = this.waveSurfer.getDuration();
    console.log('Durée totale de l\'audio :', audioDuration);

    const start = audioDuration * 0.2;
    const end = audioDuration * 0.8;

    this.waveSurfer.addRegion({
      start,
      end,
      color: 'rgba(200, 0, 200, 0.5)',
      drag: true,
      resize: true,
    });

    this.waveSurfer.on('region-update-end', (region: any) => {
      console.log('Region updated:', region.start, region.end);
      this.regionChange.emit({ start: region.start, end: region.end });
    });
  }

  /** Contrôle du zoom via un slider */
  private setupZoomControl() {
    const zoomSlider = document.getElementById('zoom-slider') as HTMLInputElement;
    zoomSlider.oninput = () => {
      const zoomLevel = Number(zoomSlider.value);
      console.log(`Zoom level: ${zoomLevel}`);
      this.waveSurfer.zoom(zoomLevel);
    };
  }

  /** Configure le bouton pour jouer la région */
  private setupPlayRegionButton() {
    const playRegionButton = document.getElementById('play-region') as HTMLButtonElement;
    playRegionButton.addEventListener('click', () => this.playRegion());
  }

  /** Lecture de la région */
  private playRegion() {
    const regions = this.waveSurfer.regions.list;
    const regionKeys = Object.keys(regions);

    if (regionKeys.length > 0) {
      const region = regions[regionKeys[0]];
      console.log(`Lecture de la région : Start = ${region.start}, End = ${region.end}`);
      region.play();
    } else {
      console.warn('No regions available to play.');
    }
  }



  /** Arrêter la lecture */
  stopPlayback() {
    if (this.waveSurfer) {
      this.waveSurfer.stop();
      console.log('Lecture stoppée.');
    }
  }
}
