import { Component } from '@angular/core';
import {BoxComponent} from '../../box/box.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    BoxComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent {

}
