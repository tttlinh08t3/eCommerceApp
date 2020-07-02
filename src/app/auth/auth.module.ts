import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

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
    ],
    exports: [
    ]
})
export class AuthModule { }
