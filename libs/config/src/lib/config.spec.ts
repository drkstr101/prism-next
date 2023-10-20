import config from './config';

describe('config', () => {
  it('SHOULD contain db options', () => {
    expect(config.db).toBeTruthy();
  });

  it('SHOULD contain demo options', () => {
    expect(config.demo).toBeTruthy();
  });
});
