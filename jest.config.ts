import type { Config } from '@jest/types';

// Configuración base compartida
const baseConfig: Config.InitialOptions = {
  preset: './jest-preset.js',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.schema.ts',
    '!src/**/*.constants.ts',
    '!src/**/*.mock.ts',
    '!src/**/*.fixture.ts',
    '!src/**/index.ts',
    '!src/**/*.interface.ts',
    '!src/**/__mocks__/**',
    '!src/**/__fixtures__/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov', 'text', 'text-summary', 'clover'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    './src/common/': {
      branches: 98,
      functions: 98,
      lines: 98,
      statements: 98,
    },
    './src/config/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    './src/database/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  setupFilesAfterEnv: [
    '<rootDir>/test/jest.setup.ts',
    '<rootDir>/test/timeout.config.ts',
    '<rootDir>/test/unit.setup.ts',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  testTimeout: 10000,
};

// Configuración específica para diferentes tipos de pruebas
const config: Config.InitialOptions = {
  ...baseConfig,
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],
      coveragePathIgnorePatterns: [
        '/test/',
        '/node_modules/',
        '.*\\.steps\\.ts$',
        '.*\\.e2e-spec\\.ts$',
      ],
      setupFilesAfterEnv: [
        '<rootDir>/test/jest.setup.ts',
        '<rootDir>/test/unit.setup.ts',
        '<rootDir>/test/timeout.config.ts',
      ],
    },
    {
      displayName: 'integration',
      testMatch: ['**/?(*.)+(steps).[jt]s?(x)'],
      coveragePathIgnorePatterns: [
        '/test/',
        '/node_modules/',
        '.*\\.spec\\.ts$',
        '.*\\.e2e-spec\\.ts$',
      ],
      setupFilesAfterEnv: [
        '<rootDir>/test/jest.setup.ts',
        '<rootDir>/test/integration.setup.ts',
        '<rootDir>/test/timeout.config.ts',
      ],
    },
    {
      displayName: 'e2e',
      testMatch: ['**/?(*.)+(e2e-spec).[jt]s?(x)'],
      coveragePathIgnorePatterns: [
        '/test/',
        '/node_modules/',
        '.*\\.spec\\.ts$',
        '.*\\.steps\\.ts$',
      ],
      setupFilesAfterEnv: [
        '<rootDir>/test/jest.setup.ts',
        '<rootDir>/test/testcontainers.setup.ts',
        '<rootDir>/test/timeout.config.ts',
      ],
    },
  ],
};

export default config;
