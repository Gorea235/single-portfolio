import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { MysqlError } from 'mysql';
import { ErrorData, notFound, respondError } from '../errors';
import { ICategoryService } from '../services/category.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class CategoriesRoute implements ApiRoute {
  constructor(
    @inject(TYPES.ICategoryService) private categoryService: ICategoryService
  ) { }

  mountRoutes(router: Router) {
    // GETs
    router.get('/categories', (req, res) => this.listCategories(req, res));
    router.get('/categories/:categoryId', (req, res) => this.getCategory(req, res));
    // POST
    router.post('/categories', (req, res) => this.createCategory(req, res));
    // PATCH
    router.patch('/categories/:categoryId', (req, res) => this.updateCategory(req, res));
    // DELETE
    router.delete('/categories/:categoryId', (req, res) => this.deleteCategory(req, res));
  }

  private stdAlterResponse(sqlErr: MysqlError, err: ErrorData, res: Response): void {
    if (sqlErr) throw sqlErr;
    else if (err) respondError(res, err);
    else res.sendStatus(200);
  }

  // GET (read) endpoints

  private listCategories(req: Request, res: Response): void {
    this.categoryService.listCategories((sqlErr, results) => {
      if (sqlErr) throw sqlErr;
      else res.json(results);
    });
  }

  private getCategory(req: Request, res: Response): void {
    this.categoryService.getCategory(req.params.categoryId, (sqlErr, results) => {
      if (sqlErr) throw sqlErr;
      else if (results.length === 0) {
        respondError(res, notFound, {
          msg: `unable to find category with id ${req.params.categoryId}`
        });
      } else res.json(results[0]);
    });
  }

  // POST (create) endpoint

  private createCategory(req: Request, res: Response): void {
    this.categoryService.createCategory(
      req,
      req.body,
      (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
    );
  }

  // PATCH (update) endpoint

  private updateCategory(req: Request, res: Response): void {
    this.categoryService.updateCategory(
      req,
      req.params.categoryId,
      req.body,
      (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
    );
  }

  // DELETE (delete) endpoint

  private deleteCategory(req: Request, res: Response): void {
    this.categoryService.deleteCategory(
      req,
      req.params.categoryId,
      (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
    );
  }
}
