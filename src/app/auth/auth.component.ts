import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>'
})
export class AuthComponent implements OnInit {
  constructor(  private router: Router,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private store: Store<fromApp.AppState> ) {
        const path = this.location.path();
        if (!path || path === '/auth') {
            this.router.navigate(['login'], { relativeTo: this.activatedRoute });
        }
  }

  ngOnInit() {
  }
}
