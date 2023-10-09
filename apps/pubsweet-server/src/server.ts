import { logger, startServer } from '@coko/server';
import { setupDatabase } from '@prism-next/db';
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
      logger.info('Initializing database.');
      await setupDatabase();
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
