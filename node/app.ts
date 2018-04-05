import { createServer } from 'http';
import * as express from 'express';
import { join } from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import * as debug from 'debug';
import { existsSync } from 'fs';
import { createConnection, Connection } from 'mysql';

import { ApiRouter } from './api';
import { Auther } from './Auther';

class App {
    private express;
    private server;
    private debug;
    private port;
    private auther;
    private dbConn: Connection;
    private apiRouter: ApiRouter;

    constructor() {
        this.express = express();
        this.debug = debug('express-example:server');
        this.initExpress();
        this.initPort();
        this.initDbConn();
        this.auther = new Auther(this.dbConn);
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

    private normalizePort(val) {
        val = parseInt(val, 10);
        if (isNaN(val)) // named pipe
            return val;
        if (val >= 0) // port number
            return val;
        return false;
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

    private initRouting() {
        // api routes
        this.apiRouter = new ApiRouter(this.auther, this.dbConn);
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
