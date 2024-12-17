import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../service/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AudioSpectrumComponent} from '../audio-spectrum/audio-spectrum.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule, CommonModule, AudioSpectrumComponent, RouterLink
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['/home']);
    }

  }


  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.setUsername(response.username);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    );
  }
}

