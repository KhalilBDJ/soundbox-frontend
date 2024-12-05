import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { JwtInterceptor} from './app/interceptor/JwtInterceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideRouter(routes),
  ],
})
  .then(() => {
    console.log('Application bootstrapped successfully!');
  })
  .catch((err) => {
    console.error('Error during application bootstrap:', err);
  });
