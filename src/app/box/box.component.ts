import {Component, EventEmitter, Input, Output} from '@angular/core';
import { SoundService, Sound } from '../service/sound.service';
import {FormsModule} from '@angular/forms';
import {
  HorizontalButtonsLayoutComponent
} from '../layouts/horizontal-buttons-layout/horizontal-buttons-layout.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-box',
  standalone: true,
  templateUrl: './box.component.html',
  imports: [
    FormsModule,
    HorizontalButtonsLayoutComponent,
    NgIf
  ],
  styleUrls: ['./box.component.css']
})

export class BoxComponent {
  @Input() sound!: Sound; // Accepter les données du son
  @Output() soundDeleted = new EventEmitter<void>(); // Émet un événement au parent après suppression

  isPopupVisible: boolean = false; // État du popup
  isFadingOut: boolean = false; // État pour gérer le fade-out
  isFullyHidden: boolean = true; // État pour masquer complètement la popup
  editedName: string = ''; // Nom modifié localement

  constructor(private soundService: SoundService) {}

  openEditPopup(): void {
    this.isPopupVisible = true;
    this.isFullyHidden = false; // Réinitialiser pour afficher la popup
    this.isFadingOut = false; // Réinitialiser l'état de fade-out
    this.editedName = this.sound.name; // Charger le nom actuel dans le champ de texte
  }

  closeEditPopup(): void {
    this.isFadingOut = true; // Déclencher le fade-out
    setTimeout(() => {
      this.isPopupVisible = false; // Cacher visuellement le popup
      this.isFullyHidden = true; // Masquer complètement après l'animation
    }, 300); // Durée de l'animation (300ms)
  }

  saveName(): void {
    if (this.editedName.trim() && this.editedName !== this.sound.name) {
      this.soundService.updateSoundName(this.sound.id, this.editedName).subscribe({
        next: () => {
          this.sound.name = this.editedName; // Mettre à jour le nom localement
          this.closeEditPopup(); // Fermer le popup après succès
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du nom :', err);
        }
      });
    } else {
      this.closeEditPopup(); // Fermer si le nom est inchangé
    }
  }

  deleteSound(): void {
    this.isFadingOut = true; // Déclencher le fade-out
    setTimeout(() => {
      this.soundService.deleteSound(this.sound.id).subscribe({
        next: () => {
          this.isFullyHidden = true; // Masquer complètement après l'animation
          alert(`Votre son "${this.sound.name}" a été supprimé.`); // Notifier l'utilisateur
          this.soundDeleted.emit(); // Notifier le parent pour actualiser les données
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du son :', err);
        }
      });
    }, 300); // Permettre à l'animation fade-out de se terminer
  }
}
