import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { Connection } from 'mysql';
import { AutherService } from '../services/auther.service';
import { ConfigService } from '../services/config.service';

export class Config implements ApiRoute {
    constructor(
        private configService: ConfigService
    ) { }

    mountRoutes(router: Router) {
        router.get('/config', (req, res) => this.baseRequest(req, res));
        router.get('/config/:key', (req, res) => this.getConfig(req, res));
        router.post('/config/:key', (req, res) => this.setConfig(req, res));
    }

    private baseRequest(req: Request, res: Response): void {
        res.status(400).json({
            error: 'bad request',
            message: 'given request was not valid'
        });
    }

    private invalidRequest(res: Response) {
        res.status(403).json({
            error: 'unauthorised',
            message: 'requested config item was invalid'
        });
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
            else if (err) {
                switch (err) {
                    case 'unauthorised':
                        res.status(403).json({
                            error: 'unauthorized',
                            message: 'sender was not authorised to make this request'
                        });
                        break;
                    default:
                        res.sendStatus(500);
                        break;
                }
            } else res.sendStatus(200);
        }, () => this.invalidRequest(res));
    }
}
