module.exports = {
  db: {
    url: 'DATABASE_URL',
  },
  'demo-client': {
    path: 'DEMO_CLIENT_PATH',
    url: 'DEMO_CLIENT_URL',
  },
  'pubsweet-client': {
    port: 'CLIENT_PORT',
  },
  'pubsweet-server': {
    host: 'SERVER_HOST',
    port: 'SERVER_PORT',
    secret: 'SERVER_SECRET',
    db: {
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      host: 'POSTGRES_HOST',
      database: 'POSTGRES_DB',
      port: 'POSTGRES_PORT',
    },
  },
};
