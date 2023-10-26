import { db } from './lib/db';

async function main() {
  console.log(`Seeding database with mock data...`);
}

main()
  .then(async () => {
    console.log('Seeding complete.');

    // release connection pool and exit with success code
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.trace(err);

    // release connection pool and exit with error code
    await db.$disconnect();
    process.exit(1);
  });
