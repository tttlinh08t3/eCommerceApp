import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            {
                path: '', component: AuthComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
