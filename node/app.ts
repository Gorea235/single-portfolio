import { createServer, Server } from 'http';
import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { join } from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import * as debug from 'debug';
import { existsSync } from 'fs';
import { createConnection, Connection } from 'mysql';

import { ApiRouter } from './api';
import { AutherService } from './services/auther.service';
import { ConfigService } from './services/config.service';
import { GalleryService } from './services/gallery.service';
import { RngImageService } from './services/rng-image.service';
import { SearchService } from './services/search.service';

class App {
    private express: Express;
    private server: Server;
    private debug: debug.IDebugger;
    private port: number;
    private dbConn: Connection;
    private apiRouter: ApiRouter;

    // services
    private autherService: AutherService;
    private configService: ConfigService;
    private galleryService: GalleryService;
    private rngImageService: RngImageService;
    private searchService: SearchService;

    constructor() {
        this.express = express();
        this.debug = debug('express-example:server');
        this.initExpress();
        this.initPort();
        this.initDbConn();
        this.initServices();
        this.initRouting();
    }

    private logDebug(msg: any): void {
        this.debug(msg);
    }

    private logInfo(msg: any): void {
        console.log(msg);
    }

    private initExpress() {
        const favPath = join(__dirname, 'favicon.ico');
        if (existsSync(favPath))
            this.express.use(favicon(favPath));
        this.express.use(logger('dev'));
        this.express.use(json());
        this.express.use(urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(join(__dirname)));
    }

    private initPort() {
        this.port = this.normalizePort(process.env.PORT || '3000');
        this.express.set('port', this.port);
    }

    private normalizePort(val: string): number {
        const ival = parseInt(val, 10);
        if (isNaN(ival)) // named pipe
            return ival;
        if (ival >= 0) // port number
            return ival;
        return null;
    }

    private initDbConn() {
        // takes values from env var
        // if they aren't defined, the defaults are used
        // (the defaults are for the docker dev DB)
        this.dbConn = createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 3316,
            user: process.env.DB_USER || 'default',
            password: process.env.DB_PWORD || 'default',
            database: process.env.DB_DB || 'dev'
        });
    }

    private initServices() {
        this.autherService = new AutherService(this.dbConn);
        this.configService = new ConfigService(this.autherService, this.dbConn);
        this.galleryService = new GalleryService(this.autherService, this.dbConn);
        this.rngImageService = new RngImageService(this.galleryService, this.dbConn);
        this.searchService = new SearchService(this.dbConn);
    }

    private initRouting() {
        // api routes
        this.apiRouter = new ApiRouter(
            this.autherService,
            this.configService,
            this.galleryService,
            this.rngImageService,
            this.searchService
        );
        this.express.use('/api', this.apiRouter.getRouter());

        // angular routes
        this.express.use('*', (req, res) => {
            res.sendFile(join(__dirname, 'index.html'));
        });
    }

    public listen() {
        this.server = createServer(this.express);
        this.server.listen(this.port);
        this.server.on('error', error => this.onError(error));
        this.server.on('listening', () => this.onListening());
    }

    private onError(error) {
        if (error.syscall !== 'listen')
            throw error;

        const bind = typeof this.port === 'string'
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening() {
        const addr = this.server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        this.logInfo('Listening on ' + bind);
    }
}

const app = new App();
app.listen();
