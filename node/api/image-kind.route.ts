import { Router, Request, Response } from 'express';
import { ApiRoute } from './base.route';
import { ImageKindService } from '../services/image-kind.service';

export class ImageKindRoute implements ApiRoute {
  constructor(
    private imageKindService: ImageKindService
  ) { }

  mountRoutes(router: Router) {
    router.get('/image-kinds', (req, res) => this.listImageKinds(req, res));
  }

  private listImageKinds(req: Request, res: Response): void {
    this.imageKindService.listImageKinds((sqlErr, results) => {
      if (sqlErr) throw sqlErr;
      else res.json(results);
    });
  }
}
