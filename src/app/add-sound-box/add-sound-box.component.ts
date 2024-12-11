import { Component, EventEmitter, Output } from '@angular/core';
import { SoundService } from '../service/sound.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {AudioSpectrumComponent} from '../audio-spectrum/audio-spectrum.component';

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
  audioBlob: Blob | null = null;       // Le Blob du son à pré-écouter/crop
  audioName: string = '';              // Le nom final du son
  regionStart: number = 0;             // Position début de la région
  regionEnd: number = 0;               // Position fin de la région

  constructor(private soundService: SoundService) {}

  openPopup(): void {
    this.isPopupVisible = true;
    this.isPopupFadingOut = false;
  }

  closePopup(): void {
    this.isPopupFadingOut = true;
    setTimeout(() => {
      this.isPopupVisible = false;
      // Reset des champs
      this.youtubeUrl = '';
      this.selectedFile = null;
      this.soundName = '';
      this.showAudioSpectrum = false;
      this.audioBlob = null;
      this.audioName = '';
    }, 300);
  }

  addSound(): void {
    // Si l'utilisateur a entré une URL YouTube, on récupère le preview
    if (this.youtubeUrl.trim()) {
      this.addSoundFromYouTubePreview();
    } else if (this.selectedFile) {
      // On a un fichier local
      this.prepareLocalFilePreview();
    } else {
      alert('Veuillez entrer une URL YouTube ou sélectionner un fichier audio.');
    }
  }

  private addSoundFromYouTubePreview(): void {
    const finalName = this.soundName.trim() || 'Untitled Sound';
    this.soundService.getYouTubePreview(this.youtubeUrl).subscribe({
      next: (response) => {
        // response: { audioBlob, name, duration }
        this.audioBlob = response.audioBlob;
        this.audioName = finalName; // On prend le nom choisi ou "Untitled Sound"
        this.showAudioSpectrum = true; // On affiche le composant audio-spectrum
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

    // Ici, pas besoin d'aller sur le backend pour un preview, on a déjà le fichier
    // On l'utilise directement comme source audio
    this.audioBlob = this.selectedFile;
    this.audioName = finalName;
    this.showAudioSpectrum = true; // On affiche le composant
  }

  // Méthode appelée quand la région change dans l'audio-spectrum
  onRegionChange(region: {start: number; end: number}) {
    this.regionStart = region.start;
    this.regionEnd = region.end;
  }

  // Une fois la région choisie, l'utilisateur clique sur "Enregistrer le trim"
  saveTrimmedSound(): void {
    if (!this.audioBlob) {
      console.error('No audio loaded to trim.');
      return;
    }

    const formData = new FormData();
    formData.append('data', this.audioBlob, this.audioName + '.wav');
    formData.append('name', this.audioName);
    formData.append('name', this.audioName);
    formData.append('duration', Math.round(this.regionEnd).toString());

    this.soundService.uploadSoundFileToUser(formData).subscribe({
      next: (response) => {
        console.log('Son ajouté avec succès (trim) :', response);
        alert(`Son ajouté avec succès : ${response}`);
        this.soundAdded.emit();
        this.closePopup();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du son (trim) :', error);
        alert('Erreur : ' + (error.error?.error || 'Une erreur est survenue.'));
      },
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }
}
