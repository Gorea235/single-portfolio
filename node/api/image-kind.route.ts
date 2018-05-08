import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IImageKindService } from '../services/image-kind.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class ImageKindRoute implements ApiRoute {
  constructor(
    @inject(TYPES.IImageKindService) private imageKindService: IImageKindService
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
