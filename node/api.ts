import { Router } from 'express';
import { Index, ApiRoute } from './api/base';
import { Connection } from 'mysql';

// service imports
import { AutherService } from './services/auther.service';
import { ConfigService } from './services/config.service';
import { GalleryService } from './services/gallery.service';
import { RngImageService } from './services/rng-image.service';
import { SearchService } from './services/search.service';

// API imports
import { Auth } from './api/auth';
import { Galleries } from './api/galleries';
import { Config } from './api/config';
import { Search } from './api/search';
import { RngImage } from './api/rng-image';

export class ApiRouter {
  private apiRoutes: ApiRoute[];
  private router: Router;

  constructor(
    private autherService: AutherService,
    private configService: ConfigService,
    private galleryHelper: GalleryService,
    private rngImageService: RngImageService,
    private searchService: SearchService
  ) { }

  public getRouter(): Router {
    this.apiRoutes = [new Index];
    this.router = Router();

    // load routes
    this.apiRoutes.push(new Auth(this.autherService));
    this.apiRoutes.push(new Galleries(this.galleryHelper));
    this.apiRoutes.push(new Config(this.configService));
    this.apiRoutes.push(new Search(this.searchService));
    this.apiRoutes.push(new RngImage(this.rngImageService));

    // mount routes
    this.apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(this.router));
    // final catch-all route for invalid API path
    this.router.get('*', (req, res) => {
      res.sendStatus(404);
    });

    return this.router;
  }
}
