
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    isLoading = false;
    errorMessage: string = null;
    private storeSub: Subscription;

    constructor(
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.errorMessage = authState.authError;
        });
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        this.store.dispatch(new AuthActions.LoginStart({email, password}));
        form.reset();
    }

    switchToSignUp() {
        this.router.navigate(['../signup'], { relativeTo: this.activatedRoute });
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}
