import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GalleryModel } from '../../../models/gallery.model';
import { MatDialog } from '@angular/material';
import { AlterImageDialogComponent } from '../alter-image-dialog/alter-image-dialog.component';
import { GalleryService } from '../../../services/gallery.service';
import { GalleryImageModel } from '../../../models/gallery-image.model';

@Component({
  selector: 'app-gallery-editor',
  templateUrl: './gallery-editor.component.html',
  styleUrls: ['./gallery-editor.component.css']
})
export class GalleryEditorComponent {
  @Input() gallery: GalleryModel;
  @Output() onGalleryUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private galleryService: GalleryService,
    private dialog: MatDialog
  ) { }

  openNewImageDialog(event): void {
    this.dialog
      .open(AlterImageDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) this.createNewImage(result);
      });
  }

  createNewImage(data: GalleryImageModel): void {
    this.galleryService.createImage(this.gallery, data)
      .subscribe(status => {
        if (status === 200 || status === 201) this.onGalleryUpdated.emit();
        else alert('Unable to create image');
      });
  }

  updateGallery(): void {
    this.galleryService.updateGallery(this.gallery)
      .subscribe(status => {
        if (status !== 200) alert('An error occured while performing the update');
      });
  }
}
