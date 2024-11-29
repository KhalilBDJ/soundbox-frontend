import { HttpInterceptorFn } from '@angular/common/http';
export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // Récupère le JWT depuis le localStorage

  // Vérifier si l'URL doit être exclue
  const excludedUrls = ['/auth/login', '/auth/register'];
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req); // Ignorer les URLs exclues
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Ajoute l'en-tête Authorization
      },
    });
  }

  // Debug : Afficher les en-têtes avant de transmettre la requête
  console.log('Headers after clone:', req.headers);

  return next(req); // Passe la requête au prochain intercepteur ou au backend
};
