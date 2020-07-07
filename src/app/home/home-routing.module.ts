import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductResolverService } from '../products/product-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const authRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        resolve: [ProductResolverService],
        children: [
            {
                path: 'my-account', component: MyAccountComponent,
                canActivate: [AuthGuard]
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
export class HomeRoutingModule { }
