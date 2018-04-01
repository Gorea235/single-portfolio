import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminGalleryComponent } from './components/admin-gallery/admin-gallery.component';
import { ImageComponent } from './components/image/image.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: AdminGalleryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    AdminGalleryComponent,
    ImageComponent
  ]
})
export class AdminGalleryModule { }
