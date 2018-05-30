import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GalleryModel } from '../../../models/gallery.model';
import { GalleryService } from '../../../services/gallery.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gallery-list-item',
  templateUrl: './gallery-list-item.component.html',
  styleUrls: ['./gallery-list-item.component.css']
})
export class GalleryListItemComponent {
  @Input() gallery: GalleryModel;
  @Output() onGalleryUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private galleryService: GalleryService,
    private dialog: MatDialog
  ) { }

  onDeleteClick(event): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this gallery?'
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.galleryService.deleteGallery(this.gallery)
            .subscribe(status => {
              if (status === 200 || status === 204) this.onGalleryUpdated.emit();
              else alert('Unable to delete gallery');
            });
        }
      });
  }
}
