/**
 * Do not edit, authsome is deprecated and server-side permissions should be handled by shield
 */

module.exports = {
  before: () => {
    return Promise.resolve(true);
  },
};
