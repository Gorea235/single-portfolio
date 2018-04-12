import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { Connection, MysqlError } from 'mysql';
import { GalleryService } from '../services/gallery.service';
import { ErrorData, respondError, notFound } from '../errors';

export class Galleries implements ApiRoute {
    constructor(
        private galleryHelper: GalleryService
    ) { }

    mountRoutes(router: Router) {
        // GETs
        router.get('/galleries', (req, res) => this.listGalleries(req, res));
        router.get('/galleries/:galleryId', (req, res) => this.getGallery(req, res));
        router.get('/galleries/:galleryId/images', (req, res) => this.listImages(req, res));
        router.get('/galleries/:galleryId/images/:imageId', (req, res) => this.getImage(req, res));
        // POSTs
        router.post('/galleries', (req, res) => this.createGallery(req, res));
        router.post('/galleries/:galleryId/images', (req, res) => this.createImage(req, res));
        // PATCHes
        router.patch('/galleries/:galleryId', (req, res) => this.updateGallery(req, res));
        router.patch('/galleries/:galleryId/images/:imageId', (req, res) => this.updateImage(req, res));
        // DELETEs
        router.delete('/galleries/:galleryId', (req, res) => this.deleteGallery(req, res));
        router.delete('/galleries/:galleryId/images/:imageId', (req, res) => this.deleteImage(req, res));
    }

    private stdAlterResponse(sqlErr: MysqlError, err: ErrorData, res: Response): void {
        if (sqlErr) throw sqlErr;
        else if (err) respondError(res, err);
        else res.sendStatus(200);
    }

    // GET (read) endpoints

    private listGalleries(req: Request, res: Response): void {
        this.galleryHelper.listGalleries((sqlErr, results) => {
            if (sqlErr) throw sqlErr;
            else res.json(results);
        });
    }

    private getGallery(req: Request, res: Response): void {
        this.galleryHelper.getGallery(req.params.galleryId, (sqlErr, results) => {
            if (sqlErr) throw sqlErr;
            else if (results.length === 0) {
                respondError(res, notFound, {
                    msg: `unable to find gallery with id ${req.params.galleryId}`
                });
            } else res.json(results[0]);
        });
    }

    private listImages(req: Request, res: Response): void {
        this.galleryHelper.listImages(req.params.galleryId, (sqlErr, results) => {
            if (sqlErr) throw sqlErr;
            else this.galleryHelper.processImages(results, (sqlErrProc, imgs) => {
                res.json(imgs);
            });
        });
    }

    private getImage(req: Request, res: Response): void {
        this.galleryHelper.getImage(req.params.galleryId, req.params.imageId, (sqlErr, results) => {
            if (sqlErr) throw sqlErr;
            else if (results.length === 0) {
                respondError(res, notFound, {
                    msg: `unable to find gallery image with id ${req.params.imageId} in gallery ${req.params.galleryId}`
                });
            } else {
                this.galleryHelper.processImage(results[0], (sqlErrProc, img) => {
                    if (sqlErrProc) throw sqlErrProc;
                    else res.json(img);
                });
            }
        });
    }

    // POST (create) endpoints

    private createGallery(req: Request, res: Response): void {
        this.galleryHelper.createGallery(
            req,
            req.body,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }

    private createImage(req: Request, res: Response): void {
        this.galleryHelper.createImage(
            req,
            req.params.galleryId,
            req.body,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }

    // PATCH (update) endpoints

    private updateGallery(req: Request, res: Response): void {
        this.galleryHelper.updateGallery(
            req,
            req.params.galleryId,
            req.body,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }

    private updateImage(req: Request, res: Response): void {
        this.galleryHelper.updateImage(
            req,
            req.params.galleryId,
            req.params.imageId,
            req.body,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }

    // DELETE (delete) endpoints

    private deleteGallery(req: Request, res: Response): void {
        this.galleryHelper.deleteGallery(
            req,
            req.params.galleryId,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }

    private deleteImage(req: Request, res: Response): void {
        this.galleryHelper.deleteImage(req,
            req.params.galleryId,
            req.params.imageId,
            (sqlErr, err) => this.stdAlterResponse(sqlErr, err, res)
        );
    }
}
