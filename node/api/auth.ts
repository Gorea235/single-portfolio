import { Router } from 'express';
import { ApiRoute } from './base';
import { Connection } from 'mysql';

export class Auth implements ApiRoute {
    constructor(
        private dbConn: Connection
    ) { }

    mountRoutes(router: Router) {
        router.get('/users', (req, res) => {
            res.json({
                message: 'users not implemented'
            });
        });
    }
}
