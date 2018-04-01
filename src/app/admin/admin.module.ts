import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './components/admin/admin.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';

@NgModule({
  imports: [
    CommonModule
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
