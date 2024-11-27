import { Component } from '@angular/core';
import {ModifyButtonComponent} from '../buttons/modify-button/modify-button.component';
import {PlayButtonComponent} from '../buttons/play-button/play-button.component';
import {
  HorizontalButtonsLayoutComponent
} from '../layouts/horizontal-buttons-layout/horizontal-buttons-layout.component';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    ModifyButtonComponent,
    PlayButtonComponent,
    HorizontalButtonsLayoutComponent
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {

}
