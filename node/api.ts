import { Router } from 'express';
import { inject, injectable } from 'inversify';
// API imports
import { AuthRoute } from './api/auth.route';
import { ApiRoute, IndexRoute } from './api/base.route';
import { CategoriesRoute } from './api/categories.route';
import { ConfigRoute } from './api/config.route';
import { GalleriesRoute } from './api/galleries.route';
import { ImageKindRoute } from './api/image-kind.route';
import { RngImageRoute } from './api/rng-image.route';
import { SearchRoute } from './api/search.route';
import { notFound, respondError } from './errors';
import TYPES from './types';

@injectable()
export class ApiRouter {
  private apiRoutes: ApiRoute[];
  private router: Router;

  constructor(
    @inject(TYPES.IndexRoute) private indexRoute: IndexRoute,
    @inject(TYPES.AuthRoute) private authRoute: AuthRoute,
    @inject(TYPES.CategoryRoute) private categoryRoute: CategoriesRoute,
    @inject(TYPES.ConfigRoute) private configRoute: ConfigRoute,
    @inject(TYPES.GalleriesRoute) private galleryRoute: GalleriesRoute,
    @inject(TYPES.ImageKindRoute) private imageKindRoute: ImageKindRoute,
    @inject(TYPES.RngImageRoute) private rngImageRoute: RngImageRoute,
    @inject(TYPES.SearchRoute) private searchRoute: SearchRoute
  ) { }

  public getRouter(): Router {
    this.apiRoutes = [this.indexRoute];
    this.router = Router();

    // load routes
    this.apiRoutes.push(this.authRoute);
    this.apiRoutes.push(this.categoryRoute);
    this.apiRoutes.push(this.configRoute);
    this.apiRoutes.push(this.galleryRoute);
    this.apiRoutes.push(this.imageKindRoute);
    this.apiRoutes.push(this.rngImageRoute);
    this.apiRoutes.push(this.searchRoute);

    // mount routes
    this.apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(this.router));
    // final catch-all routes for invalid API path
    this.router.get('*', (req, res) => respondError(res, notFound));
    this.router.post('*', (req, res) => respondError(res, notFound));
    this.router.patch('*', (req, res) => respondError(res, notFound));
    this.router.put('*', (req, res) => respondError(res, notFound));
    this.router.delete('*', (req, res) => respondError(res, notFound));

    return this.router;
  }
}
