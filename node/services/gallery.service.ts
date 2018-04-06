import { sqlPrimer } from '../api/base';
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
INNER JOIN 'GalleryImageCategories' ON 'GalleryImageCategories'.'id' = 'Categories'.'id'
WHERE 'GalleryImageCategories'.'id' = ?
`);

    // create SQL strings

    // update SQL strings

    // delete SQL strings


    constructor(
        private dbConn: Connection
    ) { }

    // select methods

    listGalleries(cb: (err: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryList,
                (err, results) => cb(err, results)
            );
    }

    getGallery(galleryId: number, cb: (err: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGallerySelect,
                [galleryId],
                (err, results) => cb(err, results)
            );
    }

    processImage(data: any, cb: (img) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageCategoryList,
                [data.id],
                (err, results) => {
                    cb({
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

    processImages(items: any, cb: (imgs) => void, current?) {
        current = current || [];
        this.processImage(items[0], img => {
            current.push(img);
            if (items.length > 1)
                this.processImages(items.slice(1), cb, current);
            else
                cb(current);
        });
    }

    listImages(galleryId: number, cb: (err: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageList,
                [galleryId],
                (err, results) => cb(err, results)
            );
    }

    getImage(galleryId: number, imageId: number, cb: (err: MysqlError, results: any) => void): void {
        this.dbConn
            .query(
                this.sqlGalleryImageSelect,
                [galleryId, imageId],
                (err, results) => cb(err, results)
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
