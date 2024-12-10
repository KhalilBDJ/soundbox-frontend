import { Component } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';

@Component({
  selector: 'app-audio-spectrum',
  standalone: true,
  imports: [],
  templateUrl: './audio-spectrum.component.html',
  styleUrl: './audio-spectrum.component.css'
})
export class AudioSpectrumComponent {

  ngOnInit(){
    const regions = RegionsPlugin.create()

    const ws = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: 'assets/audio/wet_fart.mp3',
      plugins: [regions],
    })

    const random = (min: number, max: number) => Math.random() * (max - min) + min
    const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

    // Create some regions at specific time ranges
    ws.on('decode', () => {
      // Regions
      regions.addRegion({
        start: 0,
        end: 8,
        content: 'Resize me',
        color: randomColor(),
        drag: false,
        resize: true,
      })})

  }


}
