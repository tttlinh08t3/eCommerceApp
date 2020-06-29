import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const authRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        // children: [
        //     {
        //         path: 'login',
        //         component: LoginComponent
        //     },
        //     {
        //         path: 'signup',
        //         component: SignupComponent
        //     }
        // ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
