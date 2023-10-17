(function main() {
  console.log('Setting up jest environment');
  jest.mock('next/router', () => require('next-router-mock'));
})();
