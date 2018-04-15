import { NgModule } from '@angular/core';
import {
  MatCardModule, MatGridListModule, MatToolbarModule,
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule, MatIconModule, MatDialogModule,
  MatDatepickerModule, MatSelectModule, MatNativeDateModule
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
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMatsModule { }
