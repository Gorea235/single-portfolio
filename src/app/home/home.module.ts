import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppMatsModule } from '../app-mats.module';

import { HomeComponent } from './components/home/home.component';
import { ImageScrollComponent } from './components/image-scroll/image-scroll.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AppPipesModule } from '../app-pipes.module';

const moduleRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes),
    AppMatsModule,
    AppPipesModule
  ],
  declarations: [
    HomeComponent,
    ImageScrollComponent,
    GalleryItemComponent,
    ContactInfoComponent
  ]
})
export class HomeModule { }
