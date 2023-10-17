import { db } from './db';

describe('prism-next.db', () => {
  it('should work', () => {
    expect(db()).toEqual('db');
  });
});
