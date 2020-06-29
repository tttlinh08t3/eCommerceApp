import {Action} from '@ngrx/store';

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export class Auth {
    userId?;
    username?;
    role?;
    groups?: any[];
    email?;
    departmentName?;
    authToken?;
    refreshToken?;
    userStatus?;
    loginStatus?;
    accessRights?;
    firstName?;
    lastName?;
    msisdn?;
    lastLogin?;
    isExpired?;
}


export class LoginInitAction implements Action {
    readonly type = LOGIN_INIT;
    payload: Auth;
}

