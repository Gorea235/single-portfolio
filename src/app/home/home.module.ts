import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMatsModule } from '../app-mats.module';
import { AppPipesModule } from '../app-pipes.module';

import { HomeComponent } from './components/home/home.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FullImageComponent } from './components/full-image/full-image.component';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

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
    ReactiveFormsModule,
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
    ContactInfoComponent,
    SearchBarComponent
  ]
})
export class HomeModule { }
