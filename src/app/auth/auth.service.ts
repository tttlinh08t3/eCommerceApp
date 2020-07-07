import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthResponse } from './auth.model';
import { EMAIL_EXISTS, OPERATION_NOT_ALLOWED, TOO_MANY_ATTEMPTS_TRY_LATER, EMAIL_NOT_FOUND, INVALID_PASSWORD, USER_DISABLED } from '../shared/error.message';
import { User } from './user.model';
const USER_DATA = 'userData';

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    API_KEY = 'AIzaSyCpLRsj_CAQSaxMDL1IXfpSjryazwL7URw';
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

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
        const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expiresInMillisecond = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expiresInMillisecond);
        }
    }

    logout() {
        this.user.next(null);
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
        this.user.next(user);
        this.autoLogout(expiresInMillisecond);
        localStorage.setItem(USER_DATA, JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case EMAIL_EXISTS.errorCode:
                errorMessage = EMAIL_EXISTS.errorMessage;
                break;
            case OPERATION_NOT_ALLOWED.errorCode:
                errorMessage = OPERATION_NOT_ALLOWED.errorMessage;
                break;
            case TOO_MANY_ATTEMPTS_TRY_LATER.errorCode:
                errorMessage = TOO_MANY_ATTEMPTS_TRY_LATER.errorMessage;
                break;
            case EMAIL_NOT_FOUND.errorCode:
                errorMessage = EMAIL_NOT_FOUND.errorMessage;
                break;
            case INVALID_PASSWORD.errorCode:
                errorMessage = INVALID_PASSWORD.errorMessage;
                break;
            case USER_DISABLED.errorCode:
                errorMessage = USER_DISABLED.errorMessage;
        }
        return throwError(errorMessage);
    }
}
