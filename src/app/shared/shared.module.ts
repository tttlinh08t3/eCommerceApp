import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    // HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    // HeaderComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}
