import { sqlPrimer } from './base.service';
import { Connection, MysqlError } from 'mysql';
import { ErrorData, badRequest, notFound, unauthorized } from '../errors';
import { AutherService } from './auther.service';
import { Request } from 'express';

export class GalleryService {
  // ==== Helper SQL strings ====

  // last insert ID
  private sqlLastInsertId = sqlPrimer(`
SELECT LAST_INSERT_ID() AS 'id'
`);
  // gallery exists
  private sqlGalleryExists = sqlPrimer(`
SELECT EXISTS(SELECT 1 FROM 'Galleries' WHERE 'Id' = ? LIMIT 1) AS 'exists'
`);
  // image exists
  private sqlImageExists = sqlPrimer(`
SELECT EXISTS(SELECT 1 FROM 'GalleryImages' WHERE 'GalleryID' = ? AND 'Id' = ? LIMIT 1) AS 'exists'
`);
  // delete and replace categories
  private sqlImgCat_RmvNonExistingBase = sqlPrimer(`
DELETE FROM 'GalleryImageCategories'
WHERE 'galleryImageId' = ?
`);
  private sqlImgCat_RmvNonExistingCats = sqlPrimer(`
'categoryId' != ?
`);
  private sqlImgCat_AddNewBase = sqlPrimer(`
INSERT IGNORE INTO 'GalleryImageCategories'
    ('GalleryImageID', 'CategoryID')
VALUES
`);
  private sqlImgCat_AddNewCats = sqlPrimer(`
(?, ?)
`);

  // ==== select SQL strings ====

  // gallery listing base
  private sqlGalleryListBase = sqlPrimer(`
SELECT 'id', 'name', 'desc', 'dateAdded', 'dateUpdated'
FROM 'Galleries'
`);
  // gallery list order
  private sqlGalleryOrder = sqlPrimer(`
ORDER BY 'Galleries'.'dateUpdated' DESC
`);
  // gallery listing
  private sqlGalleryList = this.sqlGalleryListBase + this.sqlGalleryOrder;
  // select a single gallery based on id
  private sqlGallerySelect = this.sqlGalleryListBase + sqlPrimer(`
WHERE 'id' = ?
`);
  // list images in a gallery
  private sqlImageList = sqlPrimer(`
SELECT 'GalleryImages'.'id', 'GalleryImages'.'galleryId',
    'GalleryImages'.'desc', 'GalleryImages'.'dateTaken',
    'GalleryImages'.'imageData',
    'ImageKind'.'id' as 'imageKindId', 'ImageKind'.'name' as 'imageKindName',
    'ImageKind'.'desc' as 'imageKindDesc'
FROM 'GalleryImages'
INNER JOIN 'ImageKind' ON 'GalleryImages'.'imageKindId' = 'ImageKind'.'id'
WHERE 'GalleryImages'.'galleryId' = ?
`);
  private sqlImageSelect = this.sqlImageList + sqlPrimer(`
AND 'GalleryImages'.'id' = ?
`);
  // list categories in an image
  private sqlImageCategoryList = sqlPrimer(`
SELECT 'Categories'.'id', 'Categories'.'name', 'Categories'.'desc'
FROM 'Categories'
INNER JOIN 'GalleryImageCategories' ON 'GalleryImageCategories'.'categoryId' = 'Categories'.'id'
WHERE 'GalleryImageCategories'.'galleryImageId' = ?
`);

  // ==== create SQL strings ====

  // create gallery
  private sqlGalleryCreate = sqlPrimer(`
INSERT INTO 'Galleries'
    ('Name', 'Desc', 'DateAdded', 'DateUpdated')
VALUES
    (?, ?, ?, ?)
`);
  // create image
  private sqlImageCreate = sqlPrimer(`
INSERT INTO 'GalleryImages'
    ('GalleryID', 'ImageKindID', 'Desc', 'DateTaken', 'ImageData')
VALUES
    (?, ?, ?, ?, ?)
`);

  // ==== update SQL strings ====

  // update gallery
  private sqlGalleryUpdate = sqlPrimer(`
UPDATE 'Galleries'
SET 'Name' = ?, 'Desc' = ?, 'DateUpdated' = ?
WHERE 'ID' = ?
`);
  // update gallery
  private sqlGalleryUpdateDateOnly = sqlPrimer(`
UPDATE 'Galleries'
SET 'DateUpdated' = ?
WHERE 'ID' = ?
`);
  // update image
  private sqlImageUpdate = sqlPrimer(`
UPDATE 'GalleryImages'
SET 'ImageKindId' = ?, 'Desc' = ?, 'DateTaken' = ?, 'ImageData' = ?
WHERE 'GalleryID' = ? AND 'ID' = ?
`);

  // ==== delete SQL strings ====

  // delete gallery
  private sqlGalleryDelete = sqlPrimer(`
DELETE FROM 'Galleries'
WHERE 'ID' = ?
`);
  // delete image
  private sqlImageDelete = sqlPrimer(`
DELETE FROM 'GalleryImages'
WHERE 'GalleryID' = ? AND 'Id' = ?
`);

  constructor(
    private autherService: AutherService,
    private dbConn: Connection
  ) { }

  // ==== helper methods ====

  processImage(data: any, cb: (sqlErr: MysqlError, img: {}) => void): void {
    this.dbConn
      .query(
        this.sqlImageCategoryList,
        [data.id],
        (sqlErr, results) => {
          cb(sqlErr, {
            id: data.id,
            desc: data.desc,
            dateTaken: data.dateTaken,
            imageData: data.imageData,
            galleryId: data.galleryId,
            imageKind: {
              id: data.imageKindId,
              name: data.imageKindName,
              desc: data.imageKindDesc
            },
            categories: results
          });
        }
      );
  }

  processImages(items: any, cb: (sqlErr: MysqlError, imgs: {}[]) => void, current?) {
    current = current || [];
    if (items.length > 0) {
      this.processImage(items[0], (sqlErrProc, img) => {
        if (sqlErrProc) cb(sqlErrProc, null);
        else {
          current.push(img);
          this.processImages(items.slice(1), cb, current);
        }
      });
    } else cb(null, current);
  }

  verifyGalleryStructure(gallery: any): boolean {
    if (
      !gallery ||
      !gallery.name
    ) return false;
    else return true;
  }

  verifyImageStructure(image: any): boolean {
    let catCheckFailed = false;
    if (image && image.categories && image.categories.forEach) {
      image.categories.forEach(element => {
        catCheckFailed = catCheckFailed || !element.id;
      });
    } else catCheckFailed = true;
    if (
      catCheckFailed ||
      !Date.parse(image.dateTaken) ||
      !image.imageData ||
      !image.imageKind ||
      !image.imageKind.id
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
   * @param {(cb: (sqlErr: MysqlError, err: ErrorData) => void) => void} updateImgCats
   *  The function to update the image categories with.
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
    updateImgCats: (cb: (sqlErr: MysqlError, err: ErrorData) => void) => void,
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
                  else if (updateImgCats) updateImgCats((sqlErrUp, errUp) => cb(sqlErrUp, errUp));
                  else cb(sqlErr, null);
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

  updateCategories(
    imageId: number,
    img: { categories: { id: number }[] },
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    const sqlRmvParams: any[] = [imageId];
    const sqlCatRmvWheres = [];
    const sqlInsParams = [];
    const sqlCatInsValues = [];
    img.categories.forEach(category => {
      sqlRmvParams.push(category.id);
      sqlCatRmvWheres.push(this.sqlImgCat_RmvNonExistingCats);
      sqlInsParams.push(imageId, category.id);
      sqlCatInsValues.push(this.sqlImgCat_AddNewCats);
    });
    this.dbConn
      .query(
        `${this.sqlImgCat_RmvNonExistingBase} ${sqlCatRmvWheres.length > 0 ? 'AND' : ''} ${sqlCatRmvWheres.join('AND')}`,
        sqlRmvParams,
        (sqlErrRmv, resultsRmv) => {
          if (sqlErrRmv) cb(sqlErrRmv, null);
          else if (sqlCatInsValues.length > 0) {
            this.dbConn
              .query(
                `${this.sqlImgCat_AddNewBase} ${sqlCatInsValues.join(',')}`,
                sqlInsParams,
                (sqlErrIns, resultsIns) => cb(sqlErrIns, null)
              );
          } else cb(null, null);
        }
      );
  }

  // ==== select methods ====

  listGalleries(cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlGalleryList,
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  getGallery(galleryId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlGallerySelect,
        [galleryId],
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  listImages(galleryId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlImageList,
        [galleryId],
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  getImage(galleryId: number, imageId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
    this.dbConn
      .query(
        this.sqlImageSelect,
        [galleryId, imageId],
        (sqlErr, results) => cb(sqlErr, results)
      );
  }

  // ==== create methods ====

  createGallery(
    req: Request,
    gallery: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    const now = new Date();
    this.doItemAlteration(
      req,
      this.verifyGalleryStructure,
      gallery,
      null,
      null,
      this.sqlGalleryCreate,
      () => [gallery.name, gallery.desc || '', now, now],
      null,
      cb
    );
  }

  createImage(
    req: Request,
    galleryId: number,
    image: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      this.verifyImageStructure,
      image,
      this.sqlGalleryExists,
      () => [galleryId],
      this.sqlImageCreate,
      () => [galleryId, image.imageKind.id, image.desc || '', image.dateTaken, image.imageData],
      (cbUp) => {
        // fetch the ID of the last inserted image so we can update the categories
        this.dbConn
          .query(
            this.sqlLastInsertId,
            (sqlErrId, resultsId) => {
              if (sqlErrId) cb(sqlErrId, null);
              else this.updateCategories(resultsId[0].id, image, cbUp);
            }
          );
      },
      cb
    );
  }

  // ==== update methods ====

  updateGallery(
    req: Request,
    galleryId: number,
    gallery: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      this.verifyGalleryStructure,
      gallery,
      this.sqlGalleryExists,
      () => [galleryId],
      this.sqlGalleryUpdate,
      () => [gallery.name, gallery.desc || '', new Date(), galleryId],
      null,
      cb
    );
  }

  updateImage(
    req: Request,
    galleryId: number,
    imageId: number,
    image: any,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      this.verifyImageStructure,
      image,
      this.sqlImageExists,
      () => [galleryId, imageId],
      this.sqlImageUpdate,
      () => [image.imageKind.id, image.desc, image.dateTaken, image.imageData, galleryId, imageId],
      (cbUp) => this.updateCategories(imageId, image, cbUp),
      (sqlErr, err) => {
        if (sqlErr || err) cb(sqlErr, err);
        else {
          this.dbConn
            .query(
              this.sqlGalleryUpdateDateOnly,
              [new Date(), galleryId],
              (sqlErrUp, results) => cb(sqlErrUp, null)
            );
        }
      }
    );
  }

  // ==== delete methods ====

  deleteGallery(
    req: Request,
    galleryId: number,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      null,
      null,
      this.sqlGalleryExists,
      () => [galleryId],
      this.sqlGalleryDelete,
      () => [galleryId],
      null,
      cb
    );
  }

  deleteImage(
    req: Request,
    galleryId: number,
    imageId: number,
    cb: (sqlErr: MysqlError, err: ErrorData) => void
  ): void {
    this.doItemAlteration(
      req,
      null,
      null,
      this.sqlImageExists,
      () => [galleryId, imageId],
      this.sqlImageDelete,
      () => [galleryId, imageId],
      null,
      cb
    );
  }
}
