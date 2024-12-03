import {Component, Input} from '@angular/core';
import {ModifyButtonComponent} from "../../buttons/modify-button/modify-button.component";
import {PlayButtonComponent} from "../../buttons/play-button/play-button.component";
import {Sound} from '../../service/sound.service';

@Component({
  selector: 'app-horizontal-buttons-layout',
  standalone: true,
    imports: [
        ModifyButtonComponent,
        PlayButtonComponent
    ],
  templateUrl: './horizontal-buttons-layout.component.html',
  styleUrl: './horizontal-buttons-layout.component.css'
})
export class HorizontalButtonsLayoutComponent {
  @Input() sound!: Sound; // Accepter les données du son

}
