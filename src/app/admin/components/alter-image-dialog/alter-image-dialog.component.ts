import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { GalleryImageModel } from '../../../models/gallery-image.model';
import { Observable } from 'rxjs/Observable';
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
