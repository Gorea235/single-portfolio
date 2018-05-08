import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { CategoryModel } from '../../../models/category.model';
import { AlterCategoryDialogComponent } from '../alter-category-dialog/alter-category-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Observable<CategoryModel[]>;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateCategoryList();
  }

  updateCategoryList(): void {
    this.categories = this.categoryService.listCategories();
  }

  openNewCategoryDialog(event): void {
    this.dialog
      .open(AlterCategoryDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.createCategory(result)
            .subscribe(status => {
              if (status === 200 || status === 201) this.updateCategoryList();
              else alert('Unable to create category');
            });
        }
      });
  }

  onSingleCategoryUpdated(): void {
    this.updateCategoryList();
  }
}
