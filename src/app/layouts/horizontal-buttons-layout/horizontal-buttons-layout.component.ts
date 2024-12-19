import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sound } from '../../service/sound.service';
import {PlayButtonComponent} from '../../buttons/play-button/play-button.component';
import {ModifyButtonComponent} from '../../buttons/modify-button/modify-button.component';
import {DownloadButtonComponent} from '../../buttons/download-button/download-button.component';

@Component({
  selector: 'app-horizontal-buttons-layout',
  standalone: true,
  templateUrl: './horizontal-buttons-layout.component.html',
  imports: [
    PlayButtonComponent,
    ModifyButtonComponent,
    DownloadButtonComponent
  ],
  styleUrls: ['./horizontal-buttons-layout.component.css']
})
export class HorizontalButtonsLayoutComponent {
  @Input() sound!: Sound;
  @Output() modifyClicked = new EventEmitter<void>(); // Émet un événement au parent

  onModifyClick(): void {
    this.modifyClicked.emit(); // Notifie le parent que le bouton Modifier a été cliqué
  }
}
