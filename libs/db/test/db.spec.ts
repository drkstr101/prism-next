import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';
import { db } from '../src/lib/db';

describe('prism-next.db', () => {
  describe('db', () => {
    beforeAll(async () => await db.$connect());

    afterAll(() => async () => await db.$disconnect());

    it('SHOULD be a prisma client instance', () => {
      expect(db).toBeInstanceOf(PrismaClient);
    });

    test.each(['identity', 'teamMember', 'team', 'user'])(
      'SHOULD provide a %s repository',
      (schema) => {
        expect(get(db, schema)).toBeTruthy();
      }
    );
  });
});
