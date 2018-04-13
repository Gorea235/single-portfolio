import { sqlPrimer } from './base.service';
import { GalleryService } from './gallery.service';
import { MysqlError, Connection } from 'mysql';

export class RngImageService {
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
    private galleryService: GalleryService,
    private dbConn: Connection
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
