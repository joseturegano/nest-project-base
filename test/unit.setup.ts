import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';

// Configuración común para pruebas unitarias
export default async function unitTestSetup() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: ConfigService,
        useValue: {
          get: jest.fn((key: string) => {
            interface TestConfig {
              [key: string]: string;
              DB_HOST: string;
              DB_PORT: string;
              DB_USER: string;
              DB_PASSWORD: string;
              DB_NAME: string;
              REDIS_HOST: string;
              REDIS_PORT: string;
            }

            const config: TestConfig = {
              DB_HOST: 'localhost',
              DB_PORT: '5432',
              DB_USER: 'testuser',
              DB_PASSWORD: 'testpassword',
              DB_NAME: 'testdb',
              REDIS_HOST: 'localhost',
              REDIS_PORT: '6379',
            };
            return config[key] || null;
          }),
        },
      },
    ],
  }).compile();

  // Configurar logger mock
  jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => {});
  jest.spyOn(Logger.prototype, 'verbose').mockImplementation(() => {});

  return moduleFixture;
}
