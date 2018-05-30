import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GalleryImageModel } from '../../../models/gallery-image.model';
import { GalleryModel } from '../../../models/gallery.model';
import { GalleryService } from '../../../services/gallery.service';
import { AlterImageDialogComponent } from '../alter-image-dialog/alter-image-dialog.component';

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
