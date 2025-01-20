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
    if (connection.db) {
      const collections = await connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    }
  }

  static async closeDatabase(): Promise<void> {
    if (this.mongod) {
      await this.mongod.stop();
      this.mongod = undefined;
    }
  }
}
