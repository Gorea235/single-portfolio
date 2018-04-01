import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageComponent } from './components/image/image.component';
import { FullImageComponent } from './components/full-image/full-image.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    GalleryComponent,
    ImageComponent,
    FullImageComponent
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
