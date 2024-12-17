import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {MainContainerComponent} from '../layouts/main-container/main-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MainContainerComponent
  ]
})
export class HomeComponent {
  userEmail: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = this.authService.getUsername(); //
  }
}
