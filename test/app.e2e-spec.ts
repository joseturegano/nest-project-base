import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { TestContainersSetup } from './testcontainers.setup';
import { TestModule } from './test.module';

jest.setTimeout(10000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    try {
      // Iniciar MongoDB
      const mongoSetup = await TestContainersSetup.startMongoDB();
      process.env.MONGODB_URI = mongoSetup.uri;
      process.env.MONGODB_DB_NAME = 'test';

      // Variables de entorno mínimas necesarias
      process.env.NODE_ENV = 'test';
      process.env.PORT = '0';

      // Crear aplicación
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [TestModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
      await TestContainersSetup.clearDatabase();
    } catch (error) {
      console.error('Error en beforeAll:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await app?.close();
      await TestContainersSetup.cleanup();
    } catch (error) {
      console.error('Error en afterAll:', error);
      throw error;
    }
  });

  describe('Items', () => {
    it('GET /api/items', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/items')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
