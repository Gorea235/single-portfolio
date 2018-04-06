import { Router } from 'express';
import { Connection } from 'mysql';

export interface ApiRoute {
    /**
     * mountRoutes
     * @param router The router to apply the routes to.
     */
    mountRoutes(router: Router);
}

const sqlPrimerRe = /'/g;

export function sqlPrimer(sql: string): string {
    // in order to stop excessive \` in the SQL strings,
    // we use ' and replace with ` later
    // this will only affect boot time, and not by much
    return sql.replace(sqlPrimerRe, '`');
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
