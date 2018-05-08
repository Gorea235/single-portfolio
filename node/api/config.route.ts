import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { badRequest, respondError, unauthorized } from '../errors';
import { IConfigService } from '../services/config.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class ConfigRoute implements ApiRoute {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) { }

  mountRoutes(router: Router) {
    router.get('/config', (req, res) => respondError(res, badRequest));
    router.get('/config/:key', (req, res) => this.getConfig(req, res));
    router.put('/config/:key', (req, res) => this.setConfig(req, res));
  }

  private invalidRequest(res: Response) {
    respondError(res, unauthorized, { msg: 'requested config item was invalid' });
  }

  private getConfig(req: Request, res: Response): void {
    this.configService.getConfig(req.params.key, (sqlErr, results) => {
      if (sqlErr) throw sqlErr;
      else {
        res.json({
          key: results[0] && results[0].key,
          value: results[0] && results[0].value || ''
        });
      }
    }, () => this.invalidRequest(res));
  }

  private setConfig(req: Request, res: Response): void {
    this.configService.setConfig(req.params.key, req.body.value, req, (sqlErr, err, results) => {
      if (sqlErr) throw sqlErr;
      else if (err) respondError(res, err);
      else res.sendStatus(200);
    }, () => this.invalidRequest(res));
  }
}
