import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGalleryComponent } from './components/admin-gallery/admin-gallery.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdminGalleryComponent,
    ImageComponent
  ],
  exports: [
    AdminGalleryComponent
  ]
})
export class AdminGalleryModule { }
