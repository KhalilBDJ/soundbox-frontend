import {Component, Input} from '@angular/core';

import {
  HorizontalButtonsLayoutComponent
} from '../layouts/horizontal-buttons-layout/horizontal-buttons-layout.component';
import {Sound} from '../service/sound.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    HorizontalButtonsLayoutComponent
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() sound!: Sound; // Accepter les données du son

}
