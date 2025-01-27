import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';

export class DatabaseHelper {
  private static mongod?: MongoMemoryServer;

  static async createConnection(): Promise<string> {
    if (!this.mongod) {
      this.mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'test',
          port: 27017,
        },
      });
    }
    return this.mongod.getUri();
  }

  static async clearDatabase(connection: Connection): Promise<void> {
    try {
      if (!connection || !connection.db) {
        console.warn('No hay conexión a la base de datos disponible');
        return;
      }
      const collections = await connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
      throw error;
    }
  }

  static async closeDatabase(): Promise<void> {
    if (this.mongod) {
      await this.mongod.stop();
      this.mongod = undefined;
    }
  }
}
