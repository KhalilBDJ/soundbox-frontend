import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-sound-box',
  standalone: true,
  templateUrl: './add-sound-box.component.html',
  styleUrls: ['./add-sound-box.component.css'],
  imports: [
    NgIf
  ]
})
export class AddSoundBoxComponent {
  isPopupVisible: boolean = false;
  isPopupFadingOut: boolean = false;

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
}
