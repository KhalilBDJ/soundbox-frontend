import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { SoundService } from '../service/sound.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AudioSpectrumComponent } from '../audio-spectrum/audio-spectrum.component';

@Component({
  selector: 'app-add-sound-box',
  standalone: true,
  templateUrl: './add-sound-box.component.html',
  styleUrls: ['./add-sound-box.component.css'],
  imports: [
    FormsModule,
    NgIf,
    AudioSpectrumComponent
  ]
})
export class AddSoundBoxComponent {
  @Output() soundAdded = new EventEmitter<void>();
  @ViewChild(AudioSpectrumComponent) audioSpectrumComponent!: AudioSpectrumComponent;


  isPopupVisible: boolean = false;
  isPopupFadingOut: boolean = false;
  youtubeUrl: string = '';
  selectedFile: File | null = null;
  soundName: string = '';
  showAudioSpectrum: boolean = false;
  audioBlob: Blob | null = null;
  audioName: string = '';
  regionStart: number = 0;
  regionEnd: number = 0;
  duration: number=0;

  constructor(private soundService: SoundService) {}

  openPopup(): void {
    this.isPopupVisible = true;
    this.isPopupFadingOut = false;
  }

  closePopup(): void {
    this.isPopupFadingOut = true;
    setTimeout(() => {
      this.isPopupVisible = false;
      this.resetForm();
    }, 300);
  }

  resetForm(): void {
    this.youtubeUrl = '';
    this.selectedFile = null;
    this.soundName = '';
    this.showAudioSpectrum = false;
    this.audioBlob = null;
    this.audioName = '';
    this.duration = 0;


    // Stopper la lecture audio avant de sauvegarder
    if (this.audioSpectrumComponent) {
      this.audioSpectrumComponent.stopPlayback();
    }
  }

  addSound(): void {
    if (this.youtubeUrl.trim()) {
      this.addSoundFromYouTubePreview();
    } else if (this.selectedFile) {
      this.prepareLocalFilePreview();
    } else {
      alert('Veuillez entrer une URL YouTube ou sélectionner un fichier audio.');
    }
  }

  private addSoundFromYouTubePreview(): void {

    this.soundService.getYouTubePreview(this.youtubeUrl).subscribe({
      next: (response) => {
        const finalName = this.soundName.trim() || response.name;
        this.audioBlob = response.audioBlob;
        this.audioName = finalName;
        this.duration = response.duration;
        this.showAudioSpectrum = true;
      },
      error: (error) => {
        console.error('Erreur lors de la pré-écoute du son YouTube :', error);
        alert('Erreur lors de la récupération de l\'aperçu YouTube.');
      },
    });
  }

  private prepareLocalFilePreview(): void {
    if (!this.selectedFile) {
      alert('Aucun fichier sélectionné.');
      return;
    }
    const finalName = this.soundName.trim() || this.selectedFile.name.split('.')[0];
    this.audioBlob = this.selectedFile;
    this.audioName = finalName;
    this.showAudioSpectrum = true;
  }

  onRegionChange(region: { start: number; end: number }): void {
    this.regionStart = region.start;
    this.regionEnd = region.end;
  }


  saveTrimmedSound(): void {
    if (!this.audioBlob) {
      console.error('No audio loaded to trim.');
      return;
    }

    if (this.audioSpectrumComponent) {
      this.audioSpectrumComponent.stopPlayback();
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const audioBase64 = (reader.result as string).split(',')[1];

      this.soundService.trimAndUploadSound(audioBase64, this.regionStart, this.regionEnd).subscribe({
        next: (response) => {
          const soundData = {
            data: response.trimmed_audio_base64,
            name: `${this.audioName}`,
            duration: Math.round(this.regionEnd - this.regionStart),
          };

          this.soundService.uploadSoundBytes(soundData).subscribe({
            next: () => {
              alert('Son ajouté avec succès !');
              this.soundAdded.emit();
              this.closePopup();
            },
            error: () => alert('Erreur lors de la sauvegarde du son.'),
          });
        },
        error: () => alert('Erreur lors du découpage du son.'),
      });
    };

    reader.readAsDataURL(this.audioBlob);
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }
}
