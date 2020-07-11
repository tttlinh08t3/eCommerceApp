import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthResponse } from '../auth.model';
import { environment } from '../../../environments/environment';
import * as ErrorMessage from '../../shared/error.message';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

const USER_DATA = 'userData';

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
            email,
            userId,
            token,
            expirationDate
        });
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case ErrorMessage.EMAIL_EXISTS.errorCode:
            errorMessage = ErrorMessage.EMAIL_EXISTS.errorMessage;
            break;
        case ErrorMessage.OPERATION_NOT_ALLOWED.errorCode:
            errorMessage = ErrorMessage.OPERATION_NOT_ALLOWED.errorMessage;
            break;
        case ErrorMessage.TOO_MANY_ATTEMPTS_TRY_LATER.errorCode:
            errorMessage = ErrorMessage.TOO_MANY_ATTEMPTS_TRY_LATER.errorMessage;
            break;
        case ErrorMessage.EMAIL_NOT_FOUND.errorCode:
            errorMessage = ErrorMessage.EMAIL_NOT_FOUND.errorMessage;
            break;
        case ErrorMessage.INVALID_PASSWORD.errorCode:
            errorMessage = ErrorMessage.INVALID_PASSWORD.errorMessage;
            break;
        case ErrorMessage.USER_DISABLED.errorCode:
            errorMessage = ErrorMessage.USER_DISABLED.errorMessage;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.API_KEY,
                {
                    email: authData.payload.email,
                    password : authData.payload.password,
                    returnSecureToken : true
                }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                }),
            );
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.API_KEY,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken : true
                }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    }),
                );
            })
        );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap(() => {
        this.router.navigate(['/']);
      })
    );


    @Effect()
    autoLogin = this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const user = JSON.parse(localStorage.getItem(USER_DATA));
        if (!user) {
            return { type: 'DUMMY' };
        }
        if (user._token) {
            const expiresInMillisecond = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expiresInMillisecond);
            return new AuthActions.AuthenticateSuccess({
                email: user.email,
                userId: user.id,
                token: user._token,
                expirationDate: new Date(user._tokenExpirationDate) });
        }
        return { type: 'DUMMY' };
      })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem(USER_DATA);
        this.router.navigate(['/auth']);
      })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}
}
