import { seedTeams } from './seed-teams';
import { seedUsers } from './seed-users';

export async function seedDb() {
  // await migrate();
  await seedTeams();
  await seedUsers();
}
