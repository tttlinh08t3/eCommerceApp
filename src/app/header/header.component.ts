import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

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
        this.userSub = this.authService.user.subscribe(user => {
            console.log('zo');
            this.isAuthenticated = !!user;
            this.user = user;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
