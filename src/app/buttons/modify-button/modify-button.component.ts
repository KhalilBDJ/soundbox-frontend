import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modify-button',
  standalone: true,
  templateUrl: './modify-button.component.html',
  styleUrls: ['./modify-button.component.css']
})
export class ModifyButtonComponent {
  @Output() modifyClicked = new EventEmitter<void>(); // Émet un événement au clic

  onClick(): void {
    this.modifyClicked.emit(); // Notifie le parent
  }
}
