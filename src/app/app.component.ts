import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { LoggingService } from './shared/services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'

})
export class AppComponent implements OnInit {
    constructor(private loggingService: LoggingService, private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
        this.loggingService.printLog('Init app');
    }
}
