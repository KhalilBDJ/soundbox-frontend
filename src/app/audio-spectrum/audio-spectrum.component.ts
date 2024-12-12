import {Component, EventEmitter, Input, Output} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';

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

  ngOnInit() {
    // Initialisation de WaveSurfer avec le plugin Regions
    this.regionsPlugin = RegionsPlugin.create();

    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: '/assets/audio/wet_fart.mp3',
      plugins: [this.regionsPlugin],
    });

    this.waveSurfer.on('ready', () => {
      // Obtenir la durée totale de l'audio
      const audioDuration = this.waveSurfer.getDuration();

      // Ajouter une région couvrant toute la durée de l'audio
      this.regionsPlugin.addRegion({
        start: 0,
        end: 1.5,
        color: 'rgba(200, 0, 200, 0.5)',
        drag: true,
        resize: true,
      });

      this.regionsPlugin.on('region-out',(e:any)=>{
        console.log("region exited");
      });
    });

    // Bouton pour jouer la région sélectionnée
    const playRegionButton = document.getElementById('play-region') as HTMLButtonElement;
    playRegionButton.addEventListener('click', () => {
      this.playRegion();
    });
  }

  //region.play() not working as documentation says, even on examples
  private playRegion() {
    const regions = this.regionsPlugin.getRegions();
    const regionKeys = Object.keys(regions);

    if (regionKeys.length > 0) {
      const region = regions[regionKeys[0]];
      console.log(region.end + " " + region.start);
      region.play();
    } else {
      console.warn('No regions available to play.');
    }
  }
}
