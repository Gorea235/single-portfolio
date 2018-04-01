import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageComponent } from './components/image/image.component';
import { FullImageComponent } from './components/full-image/full-image.component';

@NgModule({
  imports: [
    CommonModule
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
