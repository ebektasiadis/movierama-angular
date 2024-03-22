import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
  private _baseUrl = 'https://api.themoviedb.org';

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!request.url.startsWith(this._baseUrl)) {
      return next.handle(request);
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${environment.movieDbApiKey}`
    );

    const newRequest = request.clone({
      headers,
    });

    return next.handle(newRequest);
  }
}
