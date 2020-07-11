import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthResponse } from './auth.model';
import * as ErrorMessage from '../shared/error.message';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

const USER_DATA = 'userData';

@Injectable({providedIn: 'root'})
export class AuthService {
    API_KEY = 'AIzaSyCpLRsj_CAQSaxMDL1IXfpSjryazwL7URw';
    tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
            {
                email,
                password,
                returnSecureToken : true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
            {
                email,
                password,
                returnSecureToken : true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
            }));
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem(USER_DATA));
        if (!user) {
            return;
        }
        if (user._token) {
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
                email: user.email,
                userId: user.id,
                token: user._token,
                expirationDate: new Date(user._tokenExpirationDate) }));
            const expiresInMillisecond = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expiresInMillisecond);
        }
    }

    logout() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem(USER_DATA);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(duration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expiresInMillisecond = expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expiresInMillisecond);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.store.dispatch(new AuthActions.AuthenticateSuccess({email, userId, token, expirationDate}));
        this.autoLogout(expiresInMillisecond);
        localStorage.setItem(USER_DATA, JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }

    setLogoutTimer(expiration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expiration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}
