import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoxComponent} from './box/box.component';
import {MainContainerComponent} from './layouts/main-container/main-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoxComponent, MainContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
