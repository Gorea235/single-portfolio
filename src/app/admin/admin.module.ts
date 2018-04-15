import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMatsModule } from '../app-mats.module';
import { AppPipesModule } from '../app-pipes.module';

import { AdminComponent } from './components/admin/admin.component';
import { AdminEditorComponent } from './components/admin-editor/admin-editor.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryEditorComponent } from './components/gallery-editor/gallery-editor.component';
import { GalleryImageComponent } from './components/gallery-image/gallery-image.component';
import { GalleryListComponent } from './components/gallery-list/gallery-list.component';
import { GalleryListItemComponent } from './components/gallery-list-item/gallery-list-item.component';
import { NewGalleryDialogComponent } from './components/new-gallery-dialog/new-gallery-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlterImageDialogComponent } from './components/alter-image-dialog/alter-image-dialog.component';

const moduleRoutes: Routes = [
  {
    path: '',
    component: AdminComponent
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
    FormsModule,
    ReactiveFormsModule,
    AppMatsModule,
    AppPipesModule
  ],
  declarations: [
    AdminComponent,
    AdminEditorComponent,
    GalleryComponent,
    GalleryEditorComponent,
    GalleryImageComponent,
    GalleryListComponent,
    GalleryListItemComponent,
    NewGalleryDialogComponent,
    ConfirmDialogComponent,
    AlterImageDialogComponent
  ],
  entryComponents: [
    NewGalleryDialogComponent,
    ConfirmDialogComponent
  ]
})
export class AdminModule { }
