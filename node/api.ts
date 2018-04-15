import { Router } from 'express';
import { Index, ApiRoute } from './api/base';
import { Connection } from 'mysql';

// service imports
import { AutherService } from './services/auther.service';
import { ConfigService } from './services/config.service';
import { GalleryService } from './services/gallery.service';
import { ImageKindService } from './services/image-kind.service';
import { RngImageService } from './services/rng-image.service';
import { SearchService } from './services/search.service';

// API imports
import { Auth } from './api/auth';
import { Config } from './api/config';
import { Galleries } from './api/galleries';
import { ImageKind } from './api/image-kind';
import { RngImage } from './api/rng-image';
import { Search } from './api/search';

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
    this.apiRoutes = [new Index];
    this.router = Router();

    // load routes
    this.apiRoutes.push(new Auth(this.autherService));
    this.apiRoutes.push(new Config(this.configService));
    this.apiRoutes.push(new Galleries(this.galleryHelper));
    this.apiRoutes.push(new ImageKind(this.imageKindService));
    this.apiRoutes.push(new RngImage(this.rngImageService));
    this.apiRoutes.push(new Search(this.searchService));

    // mount routes
    this.apiRoutes.forEach(apiRoute => apiRoute.mountRoutes(this.router));
    // final catch-all route for invalid API path
    this.router.get('*', (req, res) => {
      res.sendStatus(404);
    });

    return this.router;
  }
}
