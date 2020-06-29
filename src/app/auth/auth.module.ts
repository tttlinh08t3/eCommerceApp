import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    providers: [
        AuthService
    ],
    exports: [
    ]
})
export class AuthModule { }
