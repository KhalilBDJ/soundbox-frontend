import { Component, Input } from '@angular/core';
import { SoundService, Sound } from '../service/sound.service';
import {
  HorizontalButtonsLayoutComponent
} from '../layouts/horizontal-buttons-layout/horizontal-buttons-layout.component';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-box',
  standalone: true,
  templateUrl: './box.component.html',
  imports: [
    HorizontalButtonsLayoutComponent,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input() sound!: Sound; // Accepter les données du son

  isPopupVisible: boolean = false; // État du popup
  editedName: string = ''; // Nom modifié localement

  constructor(private soundService: SoundService) {}

  openEditPopup(): void {
    this.isPopupVisible = true;
    this.editedName = this.sound.name; // Charger le nom actuel dans le champ de texte
  }

  closeEditPopup(): void {
    this.isPopupVisible = false; // Fermer le popup sans modification
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
}
