import { Router } from 'express';
import { ApiRoute } from './base';

export class User implements ApiRoute {
    mountRoutes(router: Router) {
        router.get('/users', (req, res) => {
            res.json({
                message: 'users not implemented'
            });
        });
    }
}
