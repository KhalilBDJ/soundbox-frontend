import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);

  const excludedUrls = ['/auth/login', '/auth/register'];
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  console.log('Headers after clone:', req.headers);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        localStorage.removeItem('authToken');
        router.navigate(['']);
      }
      return throwError(error);
    })
  );
};
