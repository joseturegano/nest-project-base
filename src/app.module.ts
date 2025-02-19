import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import configuration, { validate } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

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

    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
          limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
        },
      ],
    }),

    HealthModule,
    MetricsModule,
    ItemsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
