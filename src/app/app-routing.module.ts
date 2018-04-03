import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: !environment.production })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
