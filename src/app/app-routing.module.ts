import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
