import { migrate } from '@pubsweet/db-manager';
import { seedTeams } from './lib/seed-teams';
import { seedUsers } from './lib/seed-users';

export async function setupDatabase() {
  await migrate();
  await seedTeams();
  await seedUsers();
}

// run main function
setupDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.trace(err);
    process.exit(1);
  });
