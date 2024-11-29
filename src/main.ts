import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Fournit le HttpClient pour les requêtes HTTP
    provideRouter(routes), // Fournit les routes
  ],
})
  .then(() => {
    console.log('Application bootstrapped successfully!');
  })
  .catch((err) => {
    console.error('Error during application bootstrap:', err);
  });
