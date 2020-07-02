import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { loginReducer } from './login/store/login.reducer';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './products/product.service';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({login: loginReducer}),
    AppRoutingModule
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
