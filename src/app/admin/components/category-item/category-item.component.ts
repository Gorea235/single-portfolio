import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { MatDialog } from '@angular/material';
import { AlterCategoryDialogComponent } from '../alter-category-dialog/alter-category-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent {
  @Input() category: CategoryModel;
  @Output() onCategoryUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  onEditClick(event): void {
    this.dialog
      .open(AlterCategoryDialogComponent, {
        data: Object.assign({}, this.category)
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.updateCategory(this.category)
            .subscribe(status => {
              if (status === 200 || status === 204) {
                this.category = result;
              } else alert('Unable to update category');
            });
        }
      });
  }

  onDeleteClick(event): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this category?'
        }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.deleteCategory(this.category)
            .subscribe(status => {
              if (status === 200 || status === 204) this.onCategoryUpdated.emit();
              else alert('Unable to delete category');
            });
        }
      });
  }
}
