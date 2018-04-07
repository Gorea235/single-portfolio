import { Router } from 'express';
import { Connection } from 'mysql';

export interface ApiRoute {
    /**
     * mountRoutes
     * @param router The router to apply the routes to.
     */
    mountRoutes(router: Router);
}

export class Index implements ApiRoute {
    mountRoutes(router: Router) {
        router.get('/', (req, res) => {
            res.status(400).json({
                error: 'bad request',
                message: 'given request was not valid'
            });
        });
    }
}
