import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { ISearchService } from '../services/search.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class SearchRoute implements ApiRoute {
  constructor(
    @inject(TYPES.ISearchService) private searchService: ISearchService
  ) { }

  mountRoutes(router: Router) {
    router.get('/search', (req, res) => this.search(req, res));
  }

  private search(req: Request, res: Response): void {
    this.searchService.search(req.query.term || '', (sqlErr, results) => {
      if (sqlErr) throw sqlErr;
      else res.json(results);
    });
  }
}
