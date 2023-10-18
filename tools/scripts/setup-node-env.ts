// Add this file to your jest config for any nodejs projects (E.G `setupFilesAfterEnv: ['tools/scripts/setup-node-env.ts']`)

const IGNORE_ERROR_PATTERNS = [];

const IGNORE_WARNING_PATTERNS = [];

const customMatchers: jest.ExpectExtendMap = {
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
};

function setupJest() {
  console.info('Setting up nodejs test environment...');

  // this prints a nice stack trace on error
  if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', (reason) => {
      throw reason;
    });

    // Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = 'true';
  }

  // Add some custom matchers to `expect`
  expect.extend(customMatchers);
}

function failTestOnConsoleError() {
  const error = console.error;

  console.error = function (message: string | Error) {
    const allowedPattern =
      typeof message === 'string' &&
      IGNORE_ERROR_PATTERNS.find((pattern) => message.indexOf(pattern) > -1);
    if (allowedPattern) {
      return;
    }

    error.apply(console, arguments);
    throw message instanceof Error ? message : new Error(message);
  };
}

function failTestOnConsoleWarn() {
  const warn = console.warn;

  console.warn = function (message: string | Error) {
    const allowedPattern =
      typeof message === 'string' &&
      IGNORE_WARNING_PATTERNS.find((pattern) => message.indexOf(pattern) > -1);

    if (allowedPattern) {
      return;
    }

    warn.apply(console, arguments);
    throw message instanceof Error ? message : new Error(message);
  };
}

setupJest();
failTestOnConsoleError();
failTestOnConsoleWarn();
