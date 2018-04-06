import { Router, Request, Response } from 'express';
import { ApiRoute, sqlPrimer } from './base';
import { Connection } from 'mysql';
import { Auther } from '../auther';

export class Config implements ApiRoute {
    // whitelist config values
    // using whitelist instead of blacklist for security
    private allowedConfigs = [
        'portfolio_title',
        'contact_info'
    ];

    // get config
    private sqlGetConfig = sqlPrimer(`
SELECT 'key', 'value'
FROM 'Config'
WHERE 'key' = ?
`);
    // set config
    private sqlSetConfig = sqlPrimer(`
UPDATE 'Config'
SET 'Value' = ?
WHERE 'Key' = ?
`);

    constructor(
        private auther: Auther,
        private dbConn: Connection
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

    private validKey(req: Request, res: Response): boolean {
        // whitelist config keys
        if (!(req.params.key in this.allowedConfigs)) {
            res.status(403).json({
                error: 'unauthorised',
                message: 'requested config item was invalid'
            });
            return false;
        } else {
            return true;
        }
    }

    private getConfig(req: Request, res: Response): void {
        if (this.validKey(req, res)) {
            this.dbConn
                .query(
                    this.sqlGetConfig,
                    [req.params.key],
                    (err, results) => {
                        if (err) throw err;
                        res.json({
                            key: results[0] && results[0].key,
                            value: results[0] && results[0].value || ''
                        });
                    }
                );
        }
    }

    private setConfig(req: Request, res: Response): void {
        if (this.validKey(req, res)) {
            this.auther.isLoggedIn(req, loggedIn => {
                if (loggedIn) {
                    this.dbConn
                        .query(
                            this.sqlSetConfig,
                            [req.params.key, req.body.value],
                            (err, results) => {
                                if (err) throw err;
                                res.sendStatus(200);
                            }
                        );
                } else {
                    res.status(403).json({
                        error: 'unauthorized',
                        message: 'sender was not authorised to make this request'
                    });
                }
            });
        }
    }
}
