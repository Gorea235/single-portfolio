import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { Connection } from 'mysql';
import { AutherService } from '../services/auther.service';
import { ConfigService } from '../services/config.service';
import { respondError, badRequest, unauthorized } from '../errors';

export class Config implements ApiRoute {
  constructor(
    private configService: ConfigService
  ) { }

  mountRoutes(router: Router) {
    router.get('/config', (req, res) => respondError(res, badRequest));
    router.get('/config/:key', (req, res) => this.getConfig(req, res));
    router.post('/config/:key', (req, res) => this.setConfig(req, res));
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
