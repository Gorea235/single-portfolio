import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ImageScrollComponent } from './components/image-scroll/image-scroll.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    HomeComponent,
    ImageScrollComponent,
    GalleryItemComponent,
    ContactInfoComponent
  ]
})
export class HomeModule { }
