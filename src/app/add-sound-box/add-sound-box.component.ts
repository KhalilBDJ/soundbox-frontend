import { Component, EventEmitter, Output } from '@angular/core';
import { SoundService } from '../service/sound.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-sound-box',
  standalone: true,
  templateUrl: './add-sound-box.component.html',
  styleUrls: ['./add-sound-box.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class AddSoundBoxComponent {
  @Output() soundAdded = new EventEmitter<void>();
  isPopupVisible: boolean = false;
  isPopupFadingOut: boolean = false;
  youtubeUrl: string = '';
  selectedFile: File | null = null;
  soundName: string = '';

  constructor(private soundService: SoundService) {}

  openPopup(): void {
    this.isPopupVisible = true;
    this.isPopupFadingOut = false;
  }

  closePopup(): void {
    this.isPopupFadingOut = true;
    setTimeout(() => {
      this.isPopupVisible = false;
    }, 300);
  }

  addSound(): void {
    // Priorité : si l'utilisateur a entré une URL YouTube, on upload depuis YouTube
    if (this.youtubeUrl.trim()) {
      this.addSoundFromYouTube();
    } else if (this.selectedFile) {
      this.addSoundFromFile();
    } else {
      alert('Veuillez entrer une URL YouTube ou sélectionner un fichier audio.');
    }
  }

  addSoundFromYouTube(): void {
    this.soundService.uploadSoundFromYouTube(this.youtubeUrl).subscribe({
      next: (response) => {
        console.log('Son ajouté avec succès :', response);
        alert(`Son ajouté avec succès : ${response.message}`);
        this.soundAdded.emit();
        this.closePopup();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du son :', error);
        alert('Erreur : ' + (error.error?.error || 'Une erreur est survenue.'));
      },
    });
  }

  addSoundFromFile(): void {
    if (!this.selectedFile) {
      alert('Aucun fichier sélectionné.');
      return;
    }

    // Si l'utilisateur n'a pas renseigné de nom, on utilise le nom du fichier sans extension
    let finalName = this.soundName.trim();
    if (!finalName) {
      const fileName = this.selectedFile.name;
      const dotIndex = fileName.lastIndexOf('.');
      finalName = dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName;
    }

    const formData = new FormData();
    formData.append('data', this.selectedFile);
    formData.append('name', finalName);
    formData.append('duration', '0'); // La durée peut être calculée côté backend ou laissée à 0

    this.soundService.uploadSoundFileToUser(formData).subscribe({
      next: (response) => {
        console.log('Son ajouté avec succès (fichier) :', response);
        alert(`Son ajouté avec succès : ${response}`);
        this.soundAdded.emit();
        this.closePopup();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du son (fichier) :', error);
        alert('Erreur : ' + (error.error?.error || 'Une erreur est survenue.'));
      },
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }
}
