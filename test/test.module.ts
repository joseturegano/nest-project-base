import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from '../src/health/health.module';
import { MetricsModule } from '../src/metrics/metrics.module';
import { ItemsModule } from '../src/items/items.module';
import { DatabaseModule } from '../src/database/database.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test',
    }),

    // MongoDB con timeouts reducidos para pruebas
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB_NAME || 'test',
        connectTimeoutMS: 2000,
        socketTimeoutMS: 2000,
        serverSelectionTimeoutMS: 2000,
      }),
    }),

    // Sin límites de throttling en pruebas
    ThrottlerModule.forRoot([
      {
        ttl: 0,
        limit: 0,
      },
    ]),

    HealthModule,
    MetricsModule,
    ItemsModule,
    DatabaseModule,
  ],
})
export class TestModule {}
