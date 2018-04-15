import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GalleryImageModel } from '../../../models/gallery-image.model';
import { ImageHelperService } from '../../../services/image-helper.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { GalleryService } from '../../../services/gallery.service';
import { GalleryModel } from '../../../models/gallery.model';
import { AlterImageDialogComponent } from '../alter-image-dialog/alter-image-dialog.component';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.css']
})
export class GalleryImageComponent implements OnChanges {
  @Input() gallery: GalleryModel;
  @Input() image: GalleryImageModel;
  @Output() onGalleryUpdated: EventEmitter<any> = new EventEmitter<any>();

  imageSrc: string;

  constructor(
    private imageHelperService: ImageHelperService,
    private galleryService: GalleryService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.image) this.updateImage();
  }

  updateImage(): void {
    this.imageSrc = this.imageHelperService.getMediumUrl(this.image);
  }

  onEditClick(event): void {
    this.dialog
      .open(AlterImageDialogComponent, {
        data: this.image
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.galleryService.updateImage(this.gallery, result)
            .subscribe(status => {
              if (status === 200 || status === 204) {
                this.image = result;
                this.updateImage();
              } else alert('Unable to delete image');
            });
        }
      });
  }

  onDeleteClick(event): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this image?'
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.galleryService.deleteImage(this.gallery, this.image)
            .subscribe(status => {
              if (status === 200 || status === 204) this.onGalleryUpdated.emit();
              else alert('Unable to delete image');
            });
        }
      });
  }
}
