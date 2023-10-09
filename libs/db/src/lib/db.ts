import { db as _db } from '@coko/server';

import Knex from 'knex';
export const db: Knex<any, unknown[]> = _db;
