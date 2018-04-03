import { NgModule } from '@angular/core';
import {
  MatCardModule, MatGridListModule, MatToolbarModule,
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMatsModule { }
