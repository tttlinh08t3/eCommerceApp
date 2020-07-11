import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    user: User;
    private userSub: Subscription;

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.userSub = this.store.select('auth').pipe(
            map(authState => 
                authState.user)
            )
            .subscribe(user => {
                this.isAuthenticated = !!user;
                this.user = user;
            });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }
}
