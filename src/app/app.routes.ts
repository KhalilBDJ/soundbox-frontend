import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Importez le composant Login

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Route pour la page de connexion
  { path: 'home', component: HomeComponent }, // Page d'accueil

];
