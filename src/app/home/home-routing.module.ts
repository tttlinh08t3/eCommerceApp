import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProductResolverService } from '../products/product-resolver.service';
import { ProductService } from '../products/product.service';

const authRoutes: Routes = [
    {
        path: '', component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
