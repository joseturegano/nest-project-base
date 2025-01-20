import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass, Type } from 'class-transformer';

/**
 * Clase que define y valida el esquema de variables de entorno.
 * Utiliza decoradores de class-validator para validar tipos y valores.
 */
class EnvironmentVariables {
  // Configuración básica del servidor
  @IsString()
  NODE_ENV: string;

  @IsNumber()
  @Type(() => Number)
  PORT: number;

  @IsString()
  TZ: string;

  // Configuración de conexión a MongoDB
  @IsString()
  MONGODB_URI: string;

  @IsString()
  MONGODB_DB_NAME: string;

  @IsString()
  MONGODB_USER: string;

  @IsString()
  MONGODB_PASSWORD: string;

  @IsString()
  MONGODB_AUTH_SOURCE: string;

  @IsBoolean()
  @Type(() => Boolean)
  MONGODB_RETRY_WRITES: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  MONGODB_RETRY_READS: boolean;

  @IsNumber()
  @Type(() => Number)
  MONGODB_MAX_POOL_SIZE: number;

  @IsNumber()
  @Type(() => Number)
  MONGODB_MIN_POOL_SIZE: number;

  // Configuración de logging y trazabilidad
  @IsString()
  LOG_LEVEL: string;

  @IsString()
  LOG_FORMAT: string;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_REQUEST_LOGGING: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_RESPONSE_LOGGING: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_ERROR_LOGGING: boolean;

  // Configuración de métricas y observabilidad
  @IsString()
  OTLP_ENDPOINT: string;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_METRICS: boolean;

  @IsNumber()
  @Type(() => Number)
  METRICS_PORT: number;

  // Configuración de seguridad y protección
  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_RATE_LIMIT: boolean;

  @IsNumber()
  @Type(() => Number)
  RATE_LIMIT_WINDOW_MS: number;

  @IsNumber()
  @Type(() => Number)
  RATE_LIMIT_MAX_REQUESTS: number;

  @IsString()
  CORS_ORIGIN: string;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_HELMET: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_COMPRESSION: boolean;

  // Configuración de caché
  @IsNumber()
  @Type(() => Number)
  CACHE_TTL: number;

  @IsNumber()
  @Type(() => Number)
  CACHE_MAX_ITEMS: number;

  @IsBoolean()
  @Type(() => Boolean)
  ENABLE_CACHE: boolean;
}

/**
 * Valida las variables de entorno contra el esquema definido.
 * @param config - Objeto con las variables de entorno
 * @returns Configuración validada
 * @throws Error si la validación falla
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

/**
 * Retorna la configuración por defecto de la aplicación.
 * Combina variables de entorno con valores por defecto.
 * @returns Objeto de configuración completo
 */
export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  timezone: process.env.TZ || 'UTC',

  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGODB_DB_NAME || 'nestjs',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
    retryWrites: process.env.MONGODB_RETRY_WRITES === 'true',
    retryReads: process.env.MONGODB_RETRY_READS === 'true',
    maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '10', 10),
    minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '1', 10),
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
    enableRequest: process.env.ENABLE_REQUEST_LOGGING === 'true',
    enableResponse: process.env.ENABLE_RESPONSE_LOGGING === 'true',
    enableError: process.env.ENABLE_ERROR_LOGGING === 'true',
  },

  observability: {
    otlpEndpoint: process.env.OTLP_ENDPOINT,
    enableMetrics: process.env.ENABLE_METRICS === 'true',
    metricsPort: parseInt(process.env.METRICS_PORT || '9090', 10),
  },

  security: {
    enableRateLimit: process.env.ENABLE_RATE_LIMIT === 'true',
    rateLimitWindowMs: parseInt(
      process.env.RATE_LIMIT_WINDOW_MS || '60000',
      10,
    ),
    rateLimitMaxRequests: parseInt(
      process.env.RATE_LIMIT_MAX_REQUESTS || '100',
      10,
    ),
    corsOrigin: process.env.CORS_ORIGIN || '*',
    enableHelmet: process.env.ENABLE_HELMET === 'true',
    enableCompression: process.env.ENABLE_COMPRESSION === 'true',
  },

  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10),
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS || '1000', 10),
    enable: process.env.ENABLE_CACHE === 'true',
  },
});
