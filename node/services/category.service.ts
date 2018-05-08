import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { Connection, MysqlError } from 'mysql';
import { ErrorData, badRequest, notFound, unauthorized } from '../errors';
import TYPES from '../types';
import { IAutherService } from './auther.service';
import { sqlPrimer } from './base.service';

export interface ICategoryService {
  verifyCategoryStructure(category: any): boolean;
  listCategories(cb: (sqlErr: MysqlError, results: any) => void): void;
  getCategory(categoryId: number, cb: (sqlErr: MysqlError, results: any) => void): void;
  createCategory(
    req: Request,
    category: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void;
  updateCategory(
    req: Request,
    categoryId: number,
    category: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void;
  deleteCategory(
    req: Request,
    categoryId: number,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void;
}

@injectable()
export class CategoryService implements ICategoryService {
  // ==== Helper SQL strings ====

  // gallery exists
  private sqlCategoryExists = sqlPrimer(`
SELECT EXISTS(SELECT 1 FROM 'Categories' WHERE 'ID' = ? LIMIT 1) AS 'exists'
`);

  // ==== select SQL strings ====

  // gallery listing base
  private sqlCategoryList = sqlPrimer(`
SELECT 'id', 'name', 'desc'
FROM 'Categories'
`);
  // select a single gallery based on id
  private sqlCategorySelect = this.sqlCategoryList + sqlPrimer(`
WHERE 'id' = ?
`);

  // ==== create SQL strings ====

  // create gallery
  private sqlCategoryCreate = sqlPrimer(`
INSERT INTO 'Categories'
    ('Name', 'Desc')
VALUES
    (?, ?)
`);

  // ==== update SQL strings ====

  // update gallery
  private sqlCategoryUpdate = sqlPrimer(`
UPDATE 'Categories'
SET 'Name' = ?, 'Desc' = ?
WHERE 'ID' = ?
`);

  // ==== delete SQL strings ====

  // delete gallery
  private sqlCategoryDelete = sqlPrimer(`
DELETE FROM 'Categories'
WHERE 'ID' = ?
`);

  constructor(
    @inject(TYPES.IAutherService) private autherService: IAutherService,
    @inject(TYPES.Connection) private dbConn: Connection
  ) { }

  // ==== helper methods ====

  verifyCategoryStructure(category: any): boolean {
    if (
      !category ||
      !category.name
    ) return false;
    else return true;
  }

  /**
   * @param {Request} req
   *  The request object.
   * @param {(item: any) => boolean} verifyFunc
   *  The verification function to use, null to skip.
   * @param {any} item
   *  The item to verify, null to skip.
   * @param {string} existsSql
   *  The SQL to check if the item exists, null to skip.
   * @param {() => any[]} existsParams
   *  The SQL parameters for the checking SQL, null to skip.
   * @param {string} alterSql
   *  The SQL to perform the alteration.
   * @param {() => any[]} alterParams
   *  The SQL parameters for the alteration SQL.
   * @param {(sqlErr: MysqlError, err: ErrorData) => void} cb
   *  The final callback function.
   */
  private doItemAlteration(
    req: Request,
    verifyFunc: (item: any) => boolean,
    item: any,
    existsSql: string,
    existsParams: () => any[],
    alterSql: string,
    alterParams: () => any[],
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    // ensured logged in first
    this.autherService.isLoggedIn(req, (loggedIn) => {
      if (loggedIn) {
        // if the verification function exists, use it to check the item
        if (!verifyFunc || verifyFunc(item)) {
          // the final alteration query
          const alterFunc = () => {
            this.dbConn
              .query(
                alterSql,
                alterParams(),
                (sqlErr, results) => {
                  if (sqlErr) cb(sqlErr, null);
                  else cb(null, null);
                }
              );
          };
          // if we need to check the item's existence, do that first
          if (existsSql) {
            this.dbConn
              .query(
                existsSql,
                existsParams(),
                (sqlErr, results) => {
                  // process the existance check
                  if (sqlErr) cb(sqlErr, null);
                  else if (results && results[0].exists) alterFunc(); // if found, do the alteration
                  else cb(null, notFound);
                }
              );
          } else alterFunc(); // otherwise just do the alteration
        } else cb(null, badRequest);
      } else cb(null, unauthorized);
    });
  }

  // ==== select methods ====

  listCategories(cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlCategoryList,
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  getCategory(categoryId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlCategorySelect,
        [categoryId],
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  // ==== create method ====

  createCategory(
    req: Request,
    category: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      this.verifyCategoryStructure,
      category,
      null,
      null,
      this.sqlCategoryCreate,
      () => [category.name, category.desc || ''],
      cb
    );
  }

  // ==== update method ====

  updateCategory(
    req: Request,
    categoryId: number,
    category: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      this.verifyCategoryStructure,
      category,
      this.sqlCategoryExists,
      () => [categoryId],
      this.sqlCategoryUpdate,
      () => [category.name, category.desc || '', categoryId],
      cb
    );
  }

  // ==== delete method ====

  deleteCategory(
    req: Request,
    categoryId: number,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      null,
      null,
      this.sqlCategoryExists,
      () => [categoryId],
      this.sqlCategoryDelete,
      () => [categoryId],
      cb
    );
  }
}
