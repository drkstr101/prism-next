import { ExpressServer } from './server';

export async function main() {
  const server = new ExpressServer();
  await server.boot();
  await server.start();
}

// Run the server application
main().catch((err) => {
  console.trace(err);
  process.exit(1);
});
