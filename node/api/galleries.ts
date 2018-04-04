import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { Connection } from 'mysql';

export class Galleries implements ApiRoute {
    // gallery listing
    private sqlGalleryList = `
SELECT \`id\`, \`name\`, \`desc\`, \`dateAdded\`, \`dateUpdated\`
FROM \`Galleries\`
`;
    // select a single gallery based on id
    private sqlGallerySelect = this.sqlGalleryList + `
WHERE \`id\` = ?
`;
    // list images in a gallery
    private sqlGalleryImageList = `
SELECT \`GalleryImages\`.\`id\`, \`GalleryImages\`.\`galleryId\`,
    \`GalleryImages\`.\`desc\`, \`GalleryImages\`.\`dateTaken\`,
    \`GalleryImages\`.\`imageData\`,
    \`ImageKind\`.\`id\` as \`imageKindId\`, \`ImageKind\`.\`name\` as \`imageKindName\`,
    \`ImageKind\`.\`desc\` as \`imageKindDesc\`
FROM \`GalleryImages\`
INNER JOIN \`ImageKind\` ON \`GalleryImages\`.\`imageKindId\` = \`ImageKind\`.\`id\`
WHERE \`GalleryImages\`.\`galleryId\` = ?
`;
    private sqlGalleryImageSelect = this.sqlGalleryImageList + `
AND \`GalleryImages\`.\`id\` = ?
`;
    // list categories in an image
    private sqlGalleryImageCategoryList = `
SELECT \`Categories\`.\`id\`, \`Categories\`.\`name\`, \`Categories\`.\`desc\`
FROM \`Categories\`
INNER JOIN \`GalleryImageCategories\` ON \`GalleryImageCategories\`.\`id\` = \`Categories\`.\`id\`
WHERE \`GalleryImageCategories\`.\`id\` = ?
`;

    constructor(
        private dbConn: Connection
    ) { }

    mountRoutes(router: Router) {
        router.get('/galleries', (req, res) => this.listGalleries(req, res));
        router.get('/galleries/:galleryId', (req, res) => this.getGallery(req, res));
        router.get('/galleries/:galleryId/images', (req, res) => this.listImages(req, res));
        router.get('/galleries/:galleryId/images/:imageId', (req, res) => this.getImage(req, res));
    }

    private listGalleries(req: Request, res: Response): void {
        this.dbConn.query(this.sqlGalleryList,
            (err, results) => {
                if (err) throw err;
                res.json(results);
            });
    }

    private getGallery(req: Request, res: Response): void {
        this.dbConn.query(this.sqlGallerySelect,
            [req.params.galleryId],
            (err, results) => {
                if (err) throw err;
                if (results.length === 0)
                    res.status(404).json({
                        error: 'gallery not found',
                        message: `unable to find gallery with id ${req.params.galleryId}`
                    });
                else
                    res.json(results[0]);
            });
    }

    private processImage(data: any, cb: (img) => void): void {
        this.dbConn.query(this.sqlGalleryImageCategoryList,
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
            });
    }

    private processImages(items: any, cb: (imgs) => void, current?) {
        current = current || [];
        this.processImage(items[0], img => {
            current.push(img);
            if (items.length > 1)
                this.processImages(items.slice(1), cb, current);
            else
                cb(current);
        });
    }

    private listImages(req: Request, res: Response): void {
        this.dbConn.query(this.sqlGalleryImageList,
            [req.params.galleryId],
            (err, results) => {
                if (err) throw err;
                this.processImages(results, imgs => {
                    res.json(imgs);
                });
            });
    }

    private getImage(req: Request, res: Response): void {
        this.dbConn.query(this.sqlGalleryImageSelect,
            [req.params.galleryId, req.params.imageId],
            (err, results) => {
                if (err) throw err;
                if (results.length === 0)
                    res.status(404).json({
                        error: 'gallery image not found',
                        message: `unable to find gallery image with id ${req.params.imageId} in gallery ${req.params.galleryId}`
                    });
                else
                    this.processImage(results[0], img => {
                        res.json(img);
                    });
            });
    }
}
