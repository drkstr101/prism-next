const path = require('path');

module.exports = {
  db: {
    url: 'postgresql://postgres:postgres@localhost:5432/prism?schema=public',
  },
  'demo-client': {
    path: '/demo',
    url: 'http://localhost:4210',
  },
  pubsweet: {
    components: [
      '@coko/server/src/models/user',
      '@coko/server/src/models/identity',
      '@coko/server/src/models/team',
      '@coko/server/src/models/teamMember',
    ],
  },
  'pubsweet-client': {
    port: 4000,
  },
  'pubsweet-server': {
    host: 'localhost',
    port: 3000,
    secret: 'NOT_A_SECRET',
    db: {
      user: 'postgres',
      host: 'localhost',
      database: 'prism',
      password: 'postgres',
      port: 5432,
    },
  },
  teams: {
    global: {
      editor: {
        displayName: 'Editor',
        role: 'editor',
      },
      reviewer: {
        displayName: 'Reviewer',
        role: 'reviewer',
      },
      admin: {
        displayName: 'Admin',
        role: 'admin',
      },
    },
    nonGlobal: {},
  },
  authsome: {
    mode: path.resolve(__dirname, 'authsome.js'),
  },
};
