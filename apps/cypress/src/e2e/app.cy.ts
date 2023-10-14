import { getGreeting } from '../support/app.po';

describe('home', () => {
  // TODO pull from config
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome home');
  });
});
