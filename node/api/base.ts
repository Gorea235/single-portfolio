import { Router } from 'express';
import { Connection } from 'mysql';
import { respondError, badRequest } from '../errors';

export interface ApiRoute {
    /**
     * mountRoutes
     * @param router The router to apply the routes to.
     */
    mountRoutes(router: Router);
}

export class Index implements ApiRoute {
    mountRoutes(router: Router) {
        router.get('/', (req, res) => respondError(res, badRequest));
    }
}
