import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class OtpVerificationComponent {
  otp = '';
  email = ''; // Tu peux transmettre cet email depuis le LoginComponent
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras?.state?.['email'] || ''; // Récupère l'e-mail depuis le state
  }

  onVerifyOtp(): void {
    this.authService.verifyOtp(this.email, this.otp).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.jwtToken);
        this.router.navigate(['/home']); // Redirige après succès
      },
      (error) => {
        this.errorMessage = 'Code OTP invalide.';
      }
    );
  }

}
