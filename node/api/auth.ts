import { Router, Request, Response } from 'express';
import { ApiRoute } from './base';
import { Connection } from 'mysql';
import { Auther } from '../auther';

export class Auth implements ApiRoute {
    constructor(
        private auther: Auther,
        private dbConn: Connection
    ) { }

    mountRoutes(router: Router) {
        router.get('/auth', (req, res) => this.baseRequest(req, res));
        router.get('/auth/check', (req, res) => this.checkLoggedIn(req, res));
        router.post('/auth/login', (req, res) => this.doLogin(req, res));
    }

    private baseRequest(req: Request, res: Response): void {
        res.status(400).json({
            error: 'bad request',
            message: 'given request was not valid'
        });
    }

    private checkLoggedIn(req: Request, res: Response): void {
        this.auther.isLoggedIn(req, loggedIn => res.sendStatus(loggedIn ? 200 : 401));
    }

    private doLogin(req: Request, res: Response): void {
        this.auther.doLogin(req, res, success => res.sendStatus(success ? 200 : 400));
    }
}
