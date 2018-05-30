import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { GalleryImageModel } from '../../../models/gallery-image.model';
import { ImageKindModel } from '../../../models/image-kind.model';
import { ImageKindService } from '../../../services/image-kind.service';

@Component({
  selector: 'app-alter-image-dialog',
  templateUrl: './alter-image-dialog.component.html',
  styleUrls: ['./alter-image-dialog.component.css']
})
export class AlterImageDialogComponent implements OnInit {
  imageKinds: Observable<ImageKindModel[]>;
  validDate = true;

  constructor(
    private imageKindService: ImageKindService,
    public dialogRef: MatDialogRef<AlterImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GalleryImageModel
  ) { }

  ngOnInit(): void {
    this.imageKinds = this.imageKindService.listImageKinds();
    if (!this.data) this.data = { // if no data passed, we are creating a new image
      id: null,
      galleryId: null,
      desc: '',
      dateTaken: new Date().toISOString(),
      imageData: '',
      imageKind: {
        id: 0,
        name: '',
        desc: ''
      },
      categories: []
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  dateUpdated(event: MatDatepickerInputEvent<Date>) {
    this.validDate = Boolean(event.value);
  }
}
