import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';

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
    GalleryItemComponent
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
