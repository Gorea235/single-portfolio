import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppMatsModule } from '../app-mats.module';
import { AppPipesModule } from '../app-pipes.module';

import { HomeComponent } from './components/home/home.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FullImageComponent } from './components/full-image/full-image.component';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':galleryId',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes),
    RouterModule,
    AppMatsModule,
    AppPipesModule
  ],
  declarations: [
    HomeComponent,
    GalleryListComponent,
    GalleryItemComponent,
    GalleryComponent,
    FullImageComponent,
    GalleryImageComponent,
    ContactInfoComponent
  ]
})
export class HomeModule { }
