import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { badRequest, respondError } from '../errors';
import { IAutherService } from '../services/auther.service';
import TYPES from '../types';
import { ApiRoute } from './base.route';

@injectable()
export class AuthRoute implements ApiRoute {
  constructor(
    @inject(TYPES.IAutherService) private autherService: IAutherService
  ) { }

  mountRoutes(router: Router) {
    router.get('/auth', (req, res) => respondError(res, badRequest));
    router.get('/auth/check', (req, res) => this.checkLoggedIn(req, res));
    router.post('/auth/login', (req, res) => this.doLogin(req, res));
  }

  private checkLoggedIn(req: Request, res: Response): void {
    this.autherService.isLoggedIn(req, loggedIn => res.sendStatus(loggedIn ? 200 : 401));
  }

  private doLogin(req: Request, res: Response): void {
    this.autherService.doLogin(req, res, success => res.sendStatus(success ? 200 : 400));
  }
}
