import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { AutherService } from '../services/auther.service';
import { respondError, badRequest } from '../errors';

export class Auth implements ApiRoute {
  constructor(
    private autherService: AutherService
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
