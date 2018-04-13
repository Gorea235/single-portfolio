import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { SearchService } from '../services/search.service';

export class Search implements ApiRoute {
  constructor(
    private searchService: SearchService
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
