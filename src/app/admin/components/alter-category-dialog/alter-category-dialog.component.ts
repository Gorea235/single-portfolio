import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-alter-category-dialog',
  templateUrl: './alter-category-dialog.component.html',
  styleUrls: ['./alter-category-dialog.component.css']
})
export class AlterCategoryDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlterCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel
  ) { }

  ngOnInit(): void {
    if (!this.data) this.data = { // if no data passed, we are creating a new image
      id: null,
      name: '',
      desc: ''
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
