import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Importez le composant Login

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route pour la page de connexion
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut vers /login
  { path: '**', redirectTo: 'login' } // Route wildcard (404) qui redirige vers /login
];
