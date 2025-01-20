import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { MongoClient, MongoError } from 'mongodb';

let testContainers: StartedTestContainer[] = [];
let mongoClient: MongoClient | null = null;

export class TestContainersSetup {
  static async startMongoDB() {
    try {
      console.log('Iniciando contenedor MongoDB...');
      const mongoContainer = await new GenericContainer('mongo:6')
        .withExposedPorts(27017)
        .start();

      testContainers.push(mongoContainer);

      const host = mongoContainer.getHost();
      const port = mongoContainer.getMappedPort(27017);
      const uri = `mongodb://${host}:${port}`;

      console.log('Conectando al cliente MongoDB...');
      mongoClient = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      await mongoClient.connect();
      console.log('Cliente MongoDB conectado exitosamente');

      return { uri, container: mongoContainer };
    } catch (error) {
      console.error('Error al iniciar MongoDB:', error);
      throw error;
    }
  }

  static async clearDatabase() {
    try {
      if (!mongoClient) {
        console.log('Cliente MongoDB no inicializado, intentando reconectar...');
        if (process.env.MONGODB_URI) {
          mongoClient = new MongoClient(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
          });
          await mongoClient.connect();
        } else {
          throw new Error('MONGODB_URI no está definido');
        }
      }

      console.log('Limpiando base de datos...');
      const db = mongoClient.db(process.env.MONGODB_DB_NAME || 'test');
      
      // Colecciones conocidas que necesitamos limpiar
      const knownCollections = ['items'];
      
      for (const collectionName of knownCollections) {
        try {
          console.log(`Limpiando colección: ${collectionName}`);
          await db.collection(collectionName).deleteMany({});
        } catch (error) {
          // Si la colección no existe, ignoramos el error
          if (error instanceof MongoError && error.code !== 26) {
            throw error;
          }
        }
      }
      
      console.log('Base de datos limpiada exitosamente');
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
      throw error;
    }
  }

  static async cleanup() {
    try {
      console.log('Iniciando limpieza...');
      
      if (mongoClient) {
        console.log('Cerrando conexión MongoDB...');
        await mongoClient.close(true); // force close
        mongoClient = null;
        console.log('Conexión MongoDB cerrada');
      }

      if (testContainers.length > 0) {
        console.log('Deteniendo contenedores...');
        await Promise.all(
          testContainers.map(container => container.stop())
        );
        testContainers = [];
        console.log('Contenedores detenidos');
      }
      
      console.log('Limpieza completada');
    } catch (error) {
      console.error('Error durante la limpieza:', error);
      throw error;
    }
  }
}

// Limpieza de contenedores después de las pruebas
afterAll(async () => {
  await TestContainersSetup.cleanup();
});
