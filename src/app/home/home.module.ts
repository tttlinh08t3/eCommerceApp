import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../products/product.service';
import { DataStorageService } from '../shared/data-storage.service';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        SharedModule
    ],
    providers: [
    ],
    exports: [
    ]
})
export class HomeModule { }
