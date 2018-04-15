import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-gallery-dialog',
  templateUrl: './new-gallery-dialog.component.html',
  styleUrls: ['./new-gallery-dialog.component.css']
})
export class NewGalleryDialogComponent {
  model = {
    name: '',
    desc: ''
  };

  constructor(
    public dialogRef: MatDialogRef<NewGalleryDialogComponent>
  ) { }

  onCancel() {
    this.dialogRef.close();
  }
}
