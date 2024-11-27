import { Component } from '@angular/core';
import {ModifyButtonComponent} from "../../buttons/modify-button/modify-button.component";
import {PlayButtonComponent} from "../../buttons/play-button/play-button.component";

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

}
