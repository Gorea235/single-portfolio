import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { GalleryService } from '../services/gallery.service';
import { RngImageService } from '../services/rng-image.service';
import { respondError, serverError } from '../errors';

export class RngImage implements ApiRoute {
    constructor(
        private rngImageService: RngImageService
    ) { }

    mountRoutes(router: Router) {
        router.get('/rng-image', (req, res) => this.rngImage(req, res));
    }

    private rngImage(req: Request, res: Response): void {
        this.rngImageService.rngImage((sqlErr, image) => {
            if (sqlErr) throw sqlErr;
            else if (image) res.json(image);
            else respondError(res, serverError);
        });
    }
}
