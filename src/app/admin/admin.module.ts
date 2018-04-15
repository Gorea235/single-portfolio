import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMatsModule } from '../app-mats.module';
import { AppPipesModule } from '../app-pipes.module';
import { AuthGuard } from '../guards/auth.guard';

import { AdminComponent } from './components/admin/admin.component';
import { AdminEditorComponent } from './components/admin-editor/admin-editor.component';
import { LoginComponent } from './components/login/login.component';
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
    canActivate: [AuthGuard],
    component: AdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: ':galleryId',
    canActivate: [AuthGuard],
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
    LoginComponent,
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
    ConfirmDialogComponent,
    AlterImageDialogComponent
  ]
})
export class AdminModule { }
