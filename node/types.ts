const TYPES = {
  // concrete types
  IndexRoute: Symbol.for('IndexRoute'),
  AuthRoute: Symbol.for('AuthRoute'),
  CategoryRoute: Symbol.for('CategoryRoute'),
  ConfigRoute: Symbol.for('ConfigRoute'),
  GalleriesRoute: Symbol.for('GalleriesRoute'),
  ImageKindRoute: Symbol.for('ImageKindRoute'),
  RngImageRoute: Symbol.for('RngImageRoute'),
  SearchRoute: Symbol.for('SearchRoute'),

  // interfaces
  Connection: Symbol('Connection'),
  IAutherService: Symbol('IAutherService'),
  ICategoryService: Symbol('ICategoryService'),
  IConfigService: Symbol('IConfigService'),
  IGalleryService: Symbol('IGalleryService'),
  IImageKindService: Symbol('IImageKindService'),
  IRngImageService: Symbol('IRngImageService'),
  ISearchService: Symbol('ISearchService')
};

export default TYPES;
