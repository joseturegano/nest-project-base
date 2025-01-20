import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseHelper } from '../../database.helper';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { TestDatabaseModule } from '../../database.module';

interface ItemResponse {
  name: string;
  description: string;
  active: boolean;
  _id: string;
}

const feature = loadFeature('test/features/items/get-items.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [TestDatabaseModule, AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      connection = moduleFixture.get<Connection>(getConnectionToken());
      await DatabaseHelper.clearDatabase(connection);
    } catch (error) {
      console.error('Error en la configuración de los tests:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await DatabaseHelper.clearDatabase(connection);
      await DatabaseHelper.closeDatabase();
      await app.close();
    } catch (error) {
      console.error('Error en la limpieza después de los tests:', error);
      throw error;
    }
  });

  afterEach(async () => {
    try {
      await DatabaseHelper.clearDatabase(connection);
    } catch (error) {
      console.error(
        'Error limpiando la base de datos después del test:',
        error,
      );
      throw error;
    }
  });

  test('Obtener lista de items activos', ({ given, when, then, and }) => {
    let response: request.Response;

    given('que existen items en la base de datos', async () => {
      try {
        // Limpiar la colección antes de insertar
        await connection.collection('items').deleteMany({});

        // Insertar datos de prueba
        await connection.collection('items').insertMany([
          {
            name: 'Item 1',
            description: 'Descripción del item 1',
            active: true,
          },
          {
            name: 'Item 2',
            description: 'Descripción del item 2',
            active: true,
          },
          {
            name: 'Item 3',
            description: 'Descripción del item 3',
            active: false,
          },
        ]);
      } catch (error) {
        console.error('Error insertando datos de prueba:', error);
        throw error;
      }
    });

    when('realizo una petición GET a "/api/items"', async () => {
      try {
        response = await request(app.getHttpServer()).get('/api/items');
      } catch (error) {
        console.error('Error realizando la petición HTTP:', error);
        throw error;
      }
    });

    then('debería recibir un código de estado 200', () => {
      expect(response.status).toBe(200);
    });

    and('debería recibir solo los items activos', () => {
      const items = response.body as ItemResponse[];
      expect(items).toHaveLength(2);
      expect(items.every((item: ItemResponse) => item.active)).toBe(true);
    });

    and('los items deberían tener los campos requeridos', () => {
      const items = response.body as ItemResponse[];
      items.forEach((item: ItemResponse) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('active');
        expect(item).toHaveProperty('_id');
      });
    });
  });
});
