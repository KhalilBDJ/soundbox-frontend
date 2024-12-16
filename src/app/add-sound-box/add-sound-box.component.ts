import { Component, EventEmitter, Output } from '@angular/core';
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
    AudioSpectrumComponent // On intègre le composant
  ]
})
export class AddSoundBoxComponent {
  @Output() soundAdded = new EventEmitter<void>();

  isPopupVisible: boolean = false;
  isPopupFadingOut: boolean = false;
  youtubeUrl: string = '';
  selectedFile: File | null = null;
  soundName: string = '';
  showAudioSpectrum: boolean = false;
  audioBlob: Blob | null = null;
  audioName: string = ''; // Nom du son
  regionStart: number = 0; // Début de la région
  regionEnd: number = 0;   // Fin de la région
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
    const finalName = this.soundName.trim() || 'Untitled Sound';
    this.soundService.getYouTubePreview(this.youtubeUrl).subscribe({
      next: (response) => {
        this.audioBlob = response.audioBlob;
        this.audioName = response.name;
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

    const reader = new FileReader();
    reader.onloadend = () => {
      const audioBase64 = (reader.result as string).split(',')[1];

      // Étape 1 : Appel à trimAndUploadSound
      this.soundService.trimAndUploadSound(audioBase64, this.regionStart, this.regionEnd).subscribe({
        next: (response) => {
          console.log('Trimmed audio received:', response);

          // Étape 2 : Préparer les données JSON
          const soundData = {
            data: response.trimmed_audio_base64, // Audio en Base64
            name: `${this.audioName}`,     // Nom du fichier
            duration: Math.round(this.regionEnd - this.regionStart), // Durée
          };

          console.log("response data : " + response.trimmed_audio_base64)

          // Étape 3 : Envoyer les données JSON au backend
          this.soundService.uploadSoundBytes(soundData).subscribe({
            next: (saveResponse) => {
              console.log('Sound saved successfully:', saveResponse);
              alert('Son ajouté avec succès !');
              this.soundAdded.emit();
              this.closePopup();
            },
            error: (saveError) => {
              console.error('Error saving trimmed sound:', saveError);
              alert('Erreur lors de la sauvegarde du son.');
            },
          });
        },
        error: (trimError) => {
          console.error('Error trimming sound:', trimError);
          alert('Erreur lors du découpage du son.');
        },
      });
    };

    reader.readAsDataURL(this.audioBlob);
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }
}
