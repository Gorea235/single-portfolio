import { Router } from 'express';

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
            res.json({
                message: 'not implemented'
            });
        });
    }
}
