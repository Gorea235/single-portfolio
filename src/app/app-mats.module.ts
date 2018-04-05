import { NgModule } from '@angular/core';
import {
  MatCardModule, MatGridListModule, MatToolbarModule,
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule, MatIconModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMatsModule { }
