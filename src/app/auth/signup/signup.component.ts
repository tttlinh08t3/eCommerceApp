
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit, OnDestroy {
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
        this.errorMessage = null;
        console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = false;
        this.store.dispatch(new AuthActions.SignupStart({email, password}));
        form.reset();
    }

    switchToLogin() {
        this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}
