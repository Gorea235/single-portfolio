import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHelperService } from './http-helper.service';
import { Observable } from 'rxjs/Observable';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoryService {
  private categoryUrl = 'api/categories';

  constructor(
    private httpClient: HttpClient,
    private httpHelperService: HttpHelperService
  ) { }

  // fetching

  /**
   * Fetches the list of categories.
   */
  listCategories(): Observable<CategoryModel[]> {
    return this.httpClient
      .get<CategoryModel[]>(
        this.categoryUrl,
        this.httpHelperService.defaultOps
      );
  }

  /**
   * Fetches the category with the given ID.
   */
  getCategory(id: number): Observable<CategoryModel> {
    return this.httpClient
      .get<CategoryModel>(
        `${this.categoryUrl}/${id}`,
        this.httpHelperService.defaultOps
      );
  }

  // creating

  /**
   * Creates a new category.
   * @returns Whether the creation was successful or not.
   */
  createCategory(category: CategoryModel): Observable<number> {
    return this.httpClient
      .post(
        `${this.categoryUrl}`,
        category,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusError,
        this.httpHelperService.statusSwitch
      );
  }

  // updating

  /**
   * Updates the given category with the new data.
   * @returns Whether the update was successful or not.
   */
  updateCategory(category: CategoryModel): Observable<number> {
    return this.httpClient
      .patch(
        `${this.categoryUrl}/${category.id}`,
        category,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusError,
        this.httpHelperService.statusSwitch
      );
  }

  // deleting

  /**
   * Deletes the given category.
   * @returns Whether the deletion was successful or not.
   */
  deleteCategory(gallery: CategoryModel): Observable<number> {
    return this.httpClient
      .delete(
        `${this.categoryUrl}/${gallery.id}`,
        this.httpHelperService.respOps
      )
      .pipe(
        this.httpHelperService.statusError,
        this.httpHelperService.statusSwitch
      );
  }
}
