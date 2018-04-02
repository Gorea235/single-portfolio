import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'admin/:galleryId',
    loadChildren: 'app/admin-gallery/admin-gallery.module#AdminGalleryModule'
  },
  {
    path: ':galleryId',
    loadChildren: 'app/gallery/gallery.module#GalleryModule'
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
