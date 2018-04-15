import { NgModule } from '@angular/core';
import {
  MatCardModule, MatGridListModule, MatToolbarModule,
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule, MatIconModule, MatDialogModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMatsModule { }
