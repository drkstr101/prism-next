import { startServer, logger } from '@coko/server';
import { migrate } from '@pubsweet/db-manager';
import { once } from 'events';
import express from 'express';
import http from 'http';

export class ExpressServer {
  public readonly app: express.Application;

  private server?: http.Server;

  constructor() {
    this.app = express();
  }

  public async boot() {
    if (process.env['NODE_ENV'] !== 'production') {
      logger.info('Refreshing migrations.');
      await migrate();
    }
  }

  public async start() {
    this.server = await startServer(this.app);
    await once(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;

    this.server.close();
    await once(this.server, 'close');
    this.server = undefined;
  }
}
