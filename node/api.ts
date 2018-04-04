import { Router } from 'express';
import { Index, ApiRoute } from './api/base';
import { Connection } from 'mysql';

// API imports
import { Auth } from './api/auth';
import { Galleries } from './api/galleries';
import { Auther } from './Auther';

export class ApiRouter {
    private apiRoutes: ApiRoute[];
    private router: Router;

    constructor(
        private auther: Auther,
        private dbConn: Connection
    ) { }

    public getRouter(): Router {
        this.apiRoutes = [new Index];
        this.router = Router();

        // load routes
        this.apiRoutes.push(new Auth(this.auther, this.dbConn));
        this.apiRoutes.push(new Galleries(this.dbConn));

        // mount routes
        this.apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(this.router));
        // final catch-all route for invalid API path
        this.router.get('*', (req, res) => {
            res.sendStatus(404);
        });

        return this.router;
    }
}
