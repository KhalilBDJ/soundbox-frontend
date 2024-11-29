import { Component } from '@angular/core';
import {MainContainerComponent} from '../layouts/main-container/main-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainContainerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
