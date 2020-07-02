import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(httpRequest);
                }
                const modifiedReq = httpRequest.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
