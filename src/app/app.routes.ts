import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import {RegisterComponent} from './register/register.component';
import {OtpVerificationComponent} from './otp-verification/otp-verification.component'; // Auth Guard standalone

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Route protégée
  { path: 'register', component: RegisterComponent },
  { path: 'verify-otp', component: OtpVerificationComponent}
];
