import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule, CommonModule
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    );
  }
}
