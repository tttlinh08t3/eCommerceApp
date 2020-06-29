import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    user: User;
    private userSub: Subscription;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        console.log('test');
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            this.user = user;
            console.log(!user);
            console.log(!!user);
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
