import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { GalleryListItemComponent } from './components/gallery-list-item/gallery-list-item.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    AdminComponent,
    GalleryComponent,
    GalleryImageComponent,
    GalleryListItemComponent,
  ]
})
export class AdminModule { }
