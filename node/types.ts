const TYPES = {
  // concrete types
  IndexRoute: Symbol.for('IndexRoute'),
  AuthRoute: Symbol.for('AuthRoute'),
  ConfigRoute: Symbol.for('ConfigRoute'),
  GalleriesRoute: Symbol.for('GalleriesRoute'),
  ImageKindRoute: Symbol.for('ImageKindRoute'),
  RngImageRoute: Symbol.for('RngImageRoute'),
  SearchRoute: Symbol.for('SearchRoute'),

  // interfaces
  Connection: Symbol('Connection'),
  IAutherService: Symbol('IAutherService'),
  IConfigService: Symbol('IConfigService'),
  IGalleryService: Symbol('IGalleryService'),
  IImageKindService: Symbol('IImageKindService'),
  IRngImageService: Symbol('IRngImageService'),
  ISearchService: Symbol('ISearchService')
};

export default TYPES;
