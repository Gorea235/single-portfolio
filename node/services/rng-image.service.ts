import { inject, injectable } from 'inversify';
import { Connection, MysqlError } from 'mysql';
import TYPES from '../types';
import { sqlPrimer } from './base.service';
import { IGalleryService } from './gallery.service';

export interface IRngImageService {
  rngImage(cb: (sqlErr: MysqlError, image: {}) => void): void;
}

@injectable()
export class RngImageService implements IRngImageService {
  private sqlRngSelector = sqlPrimer(`
SELECT 'GalleryImages'.'id', 'GalleryImages'.'galleryId'
FROM 'GalleryImages'
WHERE 'GalleryImages'.'id' IN
    (SELECT 'id'
        FROM (SELECT 'id'
                FROM 'GalleryImages'
                ORDER BY RAND()
                LIMIT 1)
        t);
`);

  constructor(
    @inject(TYPES.IGalleryService) private galleryService: IGalleryService,
    @inject(TYPES.Connection) private dbConn: Connection
  ) { }

  rngImage(cb: (sqlErr: MysqlError, image: {}) => void): void {
    this.dbConn
      .query(
        this.sqlRngSelector,
        (sqlErr, results) => {
          if (sqlErr) cb(sqlErr, null);
          else {
            if (results[0]) {
              this.galleryService.getImage(
                results[0].galleryId,
                results[0].id,
                (sqlErrImg, resultsImg) => {
                  if (sqlErrImg) cb(sqlErrImg, null);
                  else {
                    this.galleryService
                      .processImage(
                        resultsImg[0],
                        (sqlErrProc, img) => cb(sqlErrProc, img)
                      );
                  }
                }
              );
            } else cb(null, null);
          }
        }
      );
  }
}
