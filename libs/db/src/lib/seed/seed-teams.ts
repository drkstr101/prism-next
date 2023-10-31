import { logger } from '@coko/server';
import Team from '@coko/server/src/models/team/team.model';
import config from 'config';

type TeamOptions = Record<string, { displayName: string; name: string; role: string }>;

export const TEAM_IDS = {
  admin: '4832688f-1a46-4f22-be37-fc29a5ca1e58',
  reviewer: 'c69f15db-3835-4b40-b695-ba22d5ae47b5',
  editor: '7faa1281-d0fe-453b-900a-62e33e4c9b10',
};

export const seedTeams = async () => {
  logger.info('Seeding global teams...');

  if (!config.has('teams.global')) {
    logger.info('No global teams declared in config');
  }

  const configGlobalTeams = config.get<TeamOptions>('teams.global');

  await Promise.all(
    Object.keys(configGlobalTeams).map(async (k) => {
      const teamData = configGlobalTeams[k];

      const exists = await Team.findOne({
        global: true,
        role: teamData.role,
      });

      if (exists) {
        logger.info(`Global team "${teamData.role}" already exists`);
        return;
      }

      await Team.insert({
        ...teamData,
        global: true,
        id: TEAM_IDS[teamData.role],
      });

      logger.info(`Added global team "${teamData.role}"`);
    })
  );
};
