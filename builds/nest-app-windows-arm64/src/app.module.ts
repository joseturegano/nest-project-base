import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import configuration, { validate } from './config/configuration';

/**
 * Módulo raíz de la aplicación que importa y configura:
 * - Variables de entorno
 * - Conexión a MongoDB
 * - Rate limiting
 * - Módulos de funcionalidad
 */
@Module({
  imports: [
    // Configura y valida variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    // Configura conexión a MongoDB con opciones de pool y reintentos
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        dbName: process.env.MONGODB_DB_NAME || 'nestjs',
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASSWORD,
        authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
        retryWrites: process.env.MONGODB_RETRY_WRITES === 'true',
        retryReads: process.env.MONGODB_RETRY_READS === 'true',
        maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '10', 10),
        minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '1', 10),
      }),
    }),

    // Configura rate limiting para protección contra ataques DDoS
    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
          limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
        },
      ],
    }),

    // Importa módulos de funcionalidad
    HealthModule, // Endpoints de health check
    MetricsModule, // Métricas y monitoreo
    ItemsModule, // Gestión de items
    DatabaseModule, // Comandos y seeds de base de datos
  ],
})
export class AppModule {}
