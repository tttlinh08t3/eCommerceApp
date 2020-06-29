// import { Action} from '@ngrx/store';
import * as LoginActions from './login.actions';

interface AppState {
    isAuthenticated: boolean;
    // auth: Auth | null;
}

const INTITIAL_STATE: AppState = {
    isAuthenticated: false
    // auth: Auth | null;
};

export function loginReducer(state = INTITIAL_STATE, action: LoginActions.LoginInitAction) {
    switch (action.type) {
        case LoginActions.LOGIN_INIT:
            return {
                ...INTITIAL_STATE
            };
        // case LoginActions.LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         // auth: { ...action.payload },
        //         error: null
        //     };
        // case LoginActions.LOGIN_FAILURE:
        //     return {
        //         ...state,
        //         isAuthenticated: false,
        //         // auth: { ...action.payload },
        //         error: null
        //     };
        default:
            return state;

    }
}
