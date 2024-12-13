import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() audioBlob!: Blob | null;
  @Output() regionChange = new EventEmitter<{ start: number; end: number }>();

  ngOnInit() {
    // Initialisation de WaveSurfer avec le plugin Regions
    this.regionsPlugin = RegionsPlugin.create({
      regions:[
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

    this.waveSurfer.load('/assets/audio/wet_fart.mp3')

    this.waveSurfer.on('ready', () => {
      // Obtenir la durée totale de l'audio
      const audioDuration = this.waveSurfer.getDuration();


      this.regionsPlugin.on('region-out',(e:any)=>{
        console.log("region exited");
        this.waveSurfer.setTime(e.start);
        this.waveSurfer.pause();
        //this.waveSurfer.setTime(e.start);
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
      const region = regions[regionKeys[0]];// Utiliser la première région disponible
      console.log(region.end + " " + region.start);
      //this.waveSurfer.setTime(region.start);
      console.log(this.waveSurfer.getCurrentTime())
      region.play();
    } else {
      console.warn('No regions available to play.');
    }
  }
}
