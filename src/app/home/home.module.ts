import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
    declarations: [
        HomeComponent,
        MyAccountComponent
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
