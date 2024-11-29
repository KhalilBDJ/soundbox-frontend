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
  userEmail: string = ''; // Email de l'utilisateur connecté

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Récupérez l'email de l'utilisateur depuis le service AuthService
    this.userEmail = this.authService.getUserEmail(); // Ajoutez cette méthode dans AuthService
  }
}
