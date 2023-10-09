import { logger, useTransaction } from '@coko/server';

import Identity from '@coko/server/src/models/identity/identity.model';
import Team from '@coko/server/src/models/team/team.model';
import User from '@coko/server/src/models/user/user.model';

export const seedUsers = async () => {
  logger.info('Seeding admin user...');

  const data = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password',
    givenNames: 'Super',
    surname: 'User',
    agreedTc: true,
  };

  const exists = await User.findOne({
    username: data.username,
  });

  if (exists) {
    logger.info('Admin user already exists');
    return;
  }

  const { email, ...restData } = data;

  await useTransaction(async (tr) => {
    const newUser = await User.insert(
      {
        ...restData,
      },
      { trx: tr }
    );

    await Identity.insert(
      {
        userId: newUser.id,
        email,
        isSocial: false,
        isVerified: true,
        isDefault: true,
      },
      { trx: tr }
    );

    await Team.addMemberToGlobalTeam(newUser.id, 'admin', { trx: tr });

    logger.info(`Admin user with id ${newUser.id} successfully created`);
  });
};
