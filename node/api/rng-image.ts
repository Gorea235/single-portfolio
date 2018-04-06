import { Router, Request, Response } from 'express';
import { ApiRoute, sqlPrimer } from './base';
import { GalleryService } from '../services/gallery.service';

export class RngImage implements ApiRoute {
    private sqlRngSelector = sqlPrimer(`
SELECT
FROM 'GalleryImages'
WHERE 'id' IN
    (SELECT id
        FROM (SELECT id
                FROM GalleryImages
                ORDER BY RAND()
                LIMIT 1)
        t);
`);

    constructor(
        private galleryHelper: GalleryService
    ) { }

    mountRoutes(router: Router) {
        router.get('/rng-image', (req, res) => this.rngImage(req, res));
    }

    private rngImage(req: Request, res: Response): void {
        res.status(400).json({
            error: 'bad request',
            message: 'given request was not valid'
        });
    }
}
