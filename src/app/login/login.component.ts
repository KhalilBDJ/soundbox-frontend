import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms'; // Importez le routeur

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {} // Injectez le routeur

  onLogin() {

    this.router.navigate(['/home']); // Naviguez vers la page d'accueil
  }
}
