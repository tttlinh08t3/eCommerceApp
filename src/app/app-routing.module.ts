import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule],
//   providers: [AuthGuard]
})
export class AppRoutingModule { }
