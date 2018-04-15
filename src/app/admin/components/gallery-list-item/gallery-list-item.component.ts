import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GalleryModel } from '../../../models/gallery.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-list-item',
  templateUrl: './gallery-list-item.component.html',
  styleUrls: ['./gallery-list-item.component.css']
})
export class GalleryListItemComponent {
  @Output() onGalleryUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Input() gallery: GalleryModel;

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
