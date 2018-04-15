import { Router } from 'express';
import { IndexRoute, ApiRoute } from './api/base.route';
import { Connection } from 'mysql';

// service imports
import { AutherService } from './services/auther.service';
import { ConfigService } from './services/config.service';
import { GalleryService } from './services/gallery.service';
import { ImageKindService } from './services/image-kind.service';
import { RngImageService } from './services/rng-image.service';
import { SearchService } from './services/search.service';

// API imports
import { AuthRoute } from './api/auth.route';
import { ConfigRoute } from './api/config.route';
import { GalleriesRoute } from './api/galleries.route';
import { ImageKindRoute } from './api/image-kind.route';
import { RngImageRoute } from './api/rng-image.route';
import { SearchRoute } from './api/search.route';

export class ApiRouter {
  private apiRoutes: ApiRoute[];
  private router: Router;

  constructor(
    private autherService: AutherService,
    private configService: ConfigService,
    private galleryHelper: GalleryService,
    private imageKindService: ImageKindService,
    private rngImageService: RngImageService,
    private searchService: SearchService
  ) { }

  public getRouter(): Router {
    this.apiRoutes = [new IndexRoute()];
    this.router = Router();

    // load routes
    this.apiRoutes.push(new AuthRoute(this.autherService));
    this.apiRoutes.push(new ConfigRoute(this.configService));
    this.apiRoutes.push(new GalleriesRoute(this.galleryHelper));
    this.apiRoutes.push(new ImageKindRoute(this.imageKindService));
    this.apiRoutes.push(new RngImageRoute(this.rngImageService));
    this.apiRoutes.push(new SearchRoute(this.searchService));

    // mount routes
    this.apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(this.router));
    // final catch-all route for invalid API path
    this.router.get('*', (req, res) => {
      res.sendStatus(404);
    });

    return this.router;
  }
}
