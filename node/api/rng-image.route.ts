import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { respondError, serverError } from '../errors';
import { IRngImageService } from '../services/rng-image.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class RngImageRoute implements ApiRoute {
  constructor(
    @inject(TYPES.IRngImageService) private rngImageService: IRngImageService
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
