import { Router } from 'express';
import { injectable } from 'inversify';
import { badRequest, respondError } from '../errors';

export interface ApiRoute {
  /**
   * mountRoutes
   * @param router The router to apply the routes to.
   */
  mountRoutes(router: Router);
}

@injectable()
export class IndexRoute implements ApiRoute {
  mountRoutes(router: Router) {
    router.get('/', (req, res) => respondError(res, badRequest));
  }
}
