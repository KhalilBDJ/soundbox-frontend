import {Component, Input} from '@angular/core';
import {ModifyButtonComponent} from '../buttons/modify-button/modify-button.component';
import {PlayButtonComponent} from '../buttons/play-button/play-button.component';
import {
  HorizontalButtonsLayoutComponent
} from '../layouts/horizontal-buttons-layout/horizontal-buttons-layout.component';
import {Sound} from '../service/sound.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    ModifyButtonComponent,
    PlayButtonComponent,
    HorizontalButtonsLayoutComponent,
    NgIf
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() sound!: Sound; // Accepter les données du son

}
