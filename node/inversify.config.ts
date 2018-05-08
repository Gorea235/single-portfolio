import { Container, interfaces } from 'inversify';
import { Connection } from 'mysql';
import { ApiRouter } from './api';
import { AuthRoute } from './api/auth.route';
import { IndexRoute } from './api/base.route';
import { CategoriesRoute } from './api/categories.route';
import { ConfigRoute } from './api/config.route';
import { GalleriesRoute } from './api/galleries.route';
import { ImageKindRoute } from './api/image-kind.route';
import { RngImageRoute } from './api/rng-image.route';
import { SearchRoute } from './api/search.route';
import { AutherService, IAutherService } from './services/auther.service';
import { CategoryService, ICategoryService } from './services/category.service';
import { ConfigService, IConfigService } from './services/config.service';
import { dbConnection } from './services/dbconnection.service';
import { GalleryService, IGalleryService } from './services/gallery.service';
import { IImageKindService, ImageKindService } from './services/image-kind.service';
import { IRngImageService, RngImageService } from './services/rng-image.service';
import { ISearchService, SearchService } from './services/search.service';
import TYPES from './types';

export function configureServices() {
  const container = new Container();

  // connection binding
  container.bind<Connection>(TYPES.Connection)
    .toDynamicValue((context: interfaces.Context) => dbConnection()).inSingletonScope();

  // main api router
  container.bind<ApiRouter>(ApiRouter).toSelf().inSingletonScope();

  // route bindings
  container.bind<AuthRoute>(TYPES.AuthRoute).to(AuthRoute);
  container.bind<IndexRoute>(TYPES.IndexRoute).to(IndexRoute);
  container.bind<CategoriesRoute>(TYPES.CategoryRoute).to(CategoriesRoute);
  container.bind<ConfigRoute>(TYPES.ConfigRoute).to(ConfigRoute);
  container.bind<GalleriesRoute>(TYPES.GalleriesRoute).to(GalleriesRoute);
  container.bind<ImageKindRoute>(TYPES.ImageKindRoute).to(ImageKindRoute);
  container.bind<RngImageRoute>(TYPES.RngImageRoute).to(RngImageRoute);
  container.bind<SearchRoute>(TYPES.SearchRoute).to(SearchRoute);

  // service bindings
  container.bind<IAutherService>(TYPES.IAutherService).to(AutherService);
  container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
  container.bind<IConfigService>(TYPES.IConfigService).to(ConfigService);
  container.bind<IGalleryService>(TYPES.IGalleryService).to(GalleryService);
  container.bind<IImageKindService>(TYPES.IImageKindService).to(ImageKindService);
  container.bind<IRngImageService>(TYPES.IRngImageService).to(RngImageService);
  container.bind<ISearchService>(TYPES.ISearchService).to(SearchService);

  return container;
}
