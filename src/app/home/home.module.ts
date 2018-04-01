import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ImageScrollComponent } from './components/image-scroll/image-scroll.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    ImageScrollComponent,
    GalleryItemComponent,
    ContactInfoComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
