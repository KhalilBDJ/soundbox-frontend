import { Component, EventEmitter, Output } from '@angular/core';
import { SoundService } from '../service/sound.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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
  youtubeUrl: string = ''; // Stocke l'URL entrée par l'utilisateur

  constructor(private soundService: SoundService) {}

  openPopup(): void {
    this.isPopupVisible = true;
    this.isPopupFadingOut = false;
  }

  closePopup(): void {
    this.isPopupFadingOut = true; // Déclenche le fade-out
    setTimeout(() => {
      this.isPopupVisible = false;
    }, 300); // Correspond à la durée de l'animation fade-out
  }

  addSoundFromYouTube(): void {
    if (this.youtubeUrl.trim()) {
      this.soundService.uploadSoundFromYouTube(this.youtubeUrl).subscribe({
        next: (response) => {
          console.log('Son ajouté avec succès :', response);
          alert(`Son ajouté avec succès : ${response.message}`);
          this.soundAdded.emit(); // Émet un événement pour notifier le parent
          this.closePopup(); // Fermer le popup après succès
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du son :', error);
          alert('Erreur : ' + (error.error?.error || 'Une erreur est survenue.'));
        },
      });
    } else {
      alert('Veuillez entrer une URL YouTube valide.');
    }
  }
}
