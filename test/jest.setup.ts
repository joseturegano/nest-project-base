import 'jest-cucumber';

jest.setTimeout(30000);

// Variables de entorno para pruebas
process.env.HEALTH_MEMORY_HEAP_THRESHOLD = '500';
process.env.HEALTH_DISK_THRESHOLD_PERCENT = '0.9';
process.env.HEALTH_MONGODB_TIMEOUT = '5000';
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.MONGODB_URI = 'mongodb://localhost:27017';
process.env.MONGODB_DB_NAME = 'test';
process.env.LOG_LEVEL = 'error';
process.env.LOG_FORMAT = 'json';

afterEach(() => {
  jest.clearAllMocks();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no capturada en:', promise, 'razón:', reason);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  throw error;
});

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

beforeAll(() => {
  process.env.TZ = 'UTC';
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
