import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './products/product.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot( fromApp.appReducer ),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    },
    ProductService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
