import { seedDb } from './lib/seed/seed-db';

seedDb()
  .then(() => process.exit(0))
  .catch((err) => {
    console.trace(err);
    process.exit(1);
  });
