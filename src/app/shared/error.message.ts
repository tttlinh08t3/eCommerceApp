interface Error {
    errorCode: string;
    errorMessage: string;
}

export const EMAIL_EXISTS: Error = {
    errorCode: 'EMAIL_EXISTS',
    errorMessage: 'This email address already exists.'
};
export const OPERATION_NOT_ALLOWED: Error = {
    errorCode: 'OPERATION_NOT_ALLOWED',
    errorMessage: 'Password sign-in is disabled for this project.'
};
export const TOO_MANY_ATTEMPTS_TRY_LATER: Error = {
    errorCode: 'TOO_MANY_ATTEMPTS_TRY_LATER',
    errorMessage: 'This account is blocked due to unusual activity. Try again later.'
};
export const EMAIL_NOT_FOUND: Error = {
    errorCode: 'EMAIL_NOT_FOUND',
    errorMessage: 'This email address does not exist.'
};
export const INVALID_PASSWORD: Error = {
    errorCode: 'INVALID_PASSWORD',
    errorMessage: 'Password is not correct.'
};
export const USER_DISABLED: Error = {
    errorCode: 'USER_DISABLED',
    errorMessage: 'This account has been disabled by an administrator.'
};
