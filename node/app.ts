import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';

import { ApiRouter } from './api';

class App {
    private express;
    private server;
    private debug;
    private port;

    constructor() {
        this.express = express();
        this.debug = debug('express-example:server');
        this.initExpress();
        this.initPort();
        this.initRouting();
    }

    private initExpress() {
        this.express.use(favicon(path.join(__dirname, 'favicon.ico')));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(__dirname)));
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

    private initRouting() {
        // api routes
        this.express.use('/api', ApiRouter);

        // angular routes
        this.express.use('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });
    }

    public listen() {
        this.server = http.createServer(this.express);
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
        this.debug('Listening on ' + bind);
    }
}

const app = new App();
app.listen();
