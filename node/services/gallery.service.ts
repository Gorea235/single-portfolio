import { sqlPrimer } from './base.service';
import { Connection, MysqlError } from 'mysql';

export class GalleryService {
    // Helper SQL strings

    // gallery exists
    private sqlGalleryExists = sqlPrimer(`
SELECT EXISTS(SELECT 1 FROM 'Galleries' WHERE 'Id' = ? LIMIT 1)
`);

    // select SQL strings

    // gallery listing
    private sqlGalleryList = sqlPrimer(`
SELECT 'id', 'name', 'desc', 'dateAdded', 'dateUpdated'
FROM 'Galleries'
`);
    // select a single gallery based on id
    private sqlGallerySelect = sqlPrimer(this.sqlGalleryList + `
WHERE 'id' = ?
`);
    // list images in a gallery
    private sqlGalleryImageList = sqlPrimer(`
SELECT 'GalleryImages'.'id', 'GalleryImages'.'galleryId',
    'GalleryImages'.'desc', 'GalleryImages'.'dateTaken',
    'GalleryImages'.'imageData',
    'ImageKind'.'id' as 'imageKindId', 'ImageKind'.'name' as 'imageKindName',
    'ImageKind'.'desc' as 'imageKindDesc'
FROM 'GalleryImages'
INNER JOIN 'ImageKind' ON 'GalleryImages'.'imageKindId' = 'ImageKind'.'id'
WHERE 'GalleryImages'.'galleryId' = ?
`);
    private sqlGalleryImageSelect = sqlPrimer(this.sqlGalleryImageList + `
AND 'GalleryImages'.'id' = ?
`);
    // list categories in an image
    private sqlGalleryImageCategoryList = sqlPrimer(`
SELECT 'Categories'.'id', 'Categories'.'name', 'Categories'.'desc'
FROM 'Categories'
INNER JOIN 'GalleryImageCategories' ON 'GalleryImageCategories'.'categoryId' = 'Categories'.'id'
WHERE 'GalleryImageCategories'.'galleryImageId' = ?
`);

    // create SQL strings

    // update SQL strings

    // delete SQL strings


    constructor(
        private dbConn: Connection
    ) { }

    // select methods

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

    processImage(data: any, cb: (sqlErr: MysqlError, img: {}) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageCategoryList,
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
        this.processImage(items[0], (sqlErrProc, img) => {
            if (sqlErrProc) cb(sqlErrProc, null);
            else {
                current.push(img);
                if (items.length > 1) this.processImages(items.slice(1), cb, current);
                else cb(null, current);
            }
        });
    }

    listImages(galleryId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageList,
                [galleryId],
                (sqlErr, results) => cb(sqlErr, results)
            );
    }

    getImage(galleryId: number, imageId: number, cb: (sqlErr: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageSelect,
                [galleryId, imageId],
                (sqlErr, results) => cb(sqlErr, results)
            );
    }

    // create methods

    createGallery(gallery: {}, cb: (err: string, msqlErr: MysqlError, results: any) => void): void {

    }

    createImage(image: {}, cb: (err: string, msqlErr: MysqlError, results: any) => void): void {

    }

    // update methods

    updateGallery(gallery: {}, cb: (err: string, msqlErr: MysqlError, results: any) => void): void {

    }

    updateImage(image: {}): void {

    }

    // delete methods

    deleteGallery(gallery: {}, cb: (err: string, msqlErr: MysqlError, results: any) => void): void {

    }

    deleteImage(image: {}, cb: (err: string, msqlErr: MysqlError, results: any) => void): void {

    }
}
