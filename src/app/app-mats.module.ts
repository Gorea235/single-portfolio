import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule, MatToolbarModule, MatButtonModule } from '@angular/material';

const modules = [
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMatsModule { }
