import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as debug from 'debug';
import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { existsSync } from 'fs';
import { Server, createServer } from 'http';
import { Container } from 'inversify';
import 'reflect-metadata';
import * as logger from 'morgan';
import { join } from 'path';
import * as favicon from 'serve-favicon';
import { ApiRouter } from './api';
import { configureServices } from './inversify.config';


class App {
  private staticDir = 'content';

  private express: Express;
  private server: Server;
  private debug: debug.IDebugger;
  private port: number;
  private apiRouter: ApiRouter;
  private container: Container;

  constructor() {
    this.express = express();
    this.debug = debug('express-example:server');
    this.initExpress();
    this.initPort();
    this.configureServices();
    this.initRouting();
  }

  private logDebug(msg: any): void {
    this.debug(msg);
  }

  private logInfo(msg: any): void {
    console.log(msg);
  }

  private initExpress() {
    const favPath = join(__dirname, this.staticDir, 'favicon.ico');
    if (existsSync(favPath))
      this.express.use(favicon(favPath));
    this.express.use(logger('dev'));
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(compression());
    this.express.use(express.static(join(__dirname, this.staticDir)));
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

  private configureServices() {
    this.container = configureServices();
  }

  private initRouting() {
    // api routes
    this.apiRouter = this.container.get<ApiRouter>(ApiRouter);
    this.express.use('/api', this.apiRouter.getRouter());

    // angular routes
    this.express.use('*', (req, res) => {
      res.sendFile(join(__dirname, this.staticDir, 'index.html'));
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
