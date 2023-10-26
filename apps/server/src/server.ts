import { once } from 'events';
import express from 'express';
import http from 'http';

export class ExpressServer {
  public readonly app: express.Application;

  private server?: http.Server;

  constructor() {
    this.app = express();

    // setup an endpoint for health checks
    this.app.use('/health', (req, res) => res.send('OK'));
  }

  public async boot() {
    // if (process.env['NODE_ENV'] !== 'production') {
    //   logger.info('Seeding development database.');
    //   await seedDb();
    // }
  }

  public async start() {
    // this.server = await startServer(this.app);
    const host = process.env['HOST'] ?? 'localhost';
    const port = parseInt(process.env['PORT'], 10) || 3000;
    this.server = await this.app.listen(port, host, () => {
      console.log(`Listening at http://${host}:${port}/api`);
    });

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
