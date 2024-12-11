import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';

@Component({
  selector: 'app-audio-spectrum',
  standalone: true,
  imports: [],
  templateUrl: './audio-spectrum.component.html',
  styleUrls: ['./audio-spectrum.component.css']
})
export class AudioSpectrumComponent implements OnChanges {
  @Input() audioBlob: Blob | null = null;
  @Output() regionChange = new EventEmitter<{start: number; end: number}>();

  private waveSurfer: any;
  private regionsPlugin: any;
  private activeRegion: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioBlob'] && this.audioBlob) {
      this.initWaveSurfer();
    }
  }

  private initWaveSurfer() {
    if (this.waveSurfer) {
      this.waveSurfer.destroy();
    }

    this.regionsPlugin = RegionsPlugin.create();

    const blobUrl = URL.createObjectURL(this.audioBlob!);

    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      backend: 'WebAudio',
      plugins: [this.regionsPlugin],
    });

    this.waveSurfer.load(blobUrl);

    this.waveSurfer.on('ready', () => {
      const audioDuration = this.waveSurfer.getDuration();
      this.activeRegion = this.regionsPlugin.addRegion({
        start: 0,
        end: audioDuration,
        color: 'rgba(200, 0, 200, 0.5)',
        drag: true,
        resize: true,
      });

      this.waveSurfer.on('region-update-end', (region: any) => {
        this.activeRegion = region;
        this.emitRegionChange();
      });

      // Gérer le stop à la fin de la région
      this.waveSurfer.on('audioprocess', () => {
        if (this.activeRegion) {
          const currentTime = this.waveSurfer.getCurrentTime();
          if (currentTime > this.activeRegion.end) {
            this.waveSurfer.pause();
            this.waveSurfer.seekTo(this.activeRegion.start / this.waveSurfer.getDuration());
          }
        }
      });

      // Émettre la région initiale
      this.emitRegionChange();
    });
  }

  playRegion() {
    if (this.activeRegion) {
      this.waveSurfer.play(this.activeRegion.start, this.activeRegion.end);
    } else {
      console.warn('No regions available to play.');
    }
  }

  private emitRegionChange() {
    if (this.activeRegion) {
      this.regionChange.emit({ start: this.activeRegion.start, end: this.activeRegion.end });
    }
  }
}
