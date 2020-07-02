import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { AuthResponse } from './auth.model';
import { EMAIL_EXISTS, OPERATION_NOT_ALLOWED, TOO_MANY_ATTEMPTS_TRY_LATER, EMAIL_NOT_FOUND, INVALID_PASSWORD, USER_DISABLED } from '../shared/error.message';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}
    API_KEY = 'AIzaSyCpLRsj_CAQSaxMDL1IXfpSjryazwL7URw';

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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        console.log('auth: this.user', this.user);
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
