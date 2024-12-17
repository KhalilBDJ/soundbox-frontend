import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData: { [key: string]: string } = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };


  errorMessage = '';

  formFields = [
    { name: 'email', label: 'Adresse email', type: 'email', placeholder: 'Entrez votre email' },
    { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez votre mot de passe' },
    { name: 'username', label: "Nom d'utilisateur", type: 'text', placeholder: "Entrez votre nom d'utilisateur" },
    { name: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Entrez votre prénom' },
    { name: 'lastName', label: 'Nom', type: 'text', placeholder: 'Entrez votre nom' },
    { name: 'phoneNumber', label: 'Numéro de téléphone', type: 'tel', placeholder: 'Entrez votre numéro' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.registerData).subscribe(
      (response) => {
        console.log(response.message); // "Utilisateur inscrit avec succès."
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Erreur lors de l’inscription', error);
        this.errorMessage = error.error.message || 'Une erreur est survenue lors de l’inscription.';
      }
    );
  }

}
