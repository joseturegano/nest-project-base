import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

/**
 * Punto de entrada principal de la aplicación NestJS.
 *
 * Este archivo se encarga de:
 * - Inicializar la aplicación
 * - Configurar middlewares globales
 * - Establecer configuraciones de seguridad
 * - Habilitar documentación API con Swagger
 * - Manejar el ciclo de vida de la aplicación
 *
 * Configuraciones principales:
 * - Prefijo global '/api' para todos los endpoints
 * - Validación automática de peticiones
 * - Compresión de respuestas
 * - Políticas de seguridad HTTP con Helmet
 * - Documentación API en /api/docs
 *
 * Variables de entorno relevantes:
 * - ENABLE_HELMET: Habilita/deshabilita Helmet
 * - ENABLE_COMPRESSION: Habilita/deshabilita compresión
 * - PORT: Puerto de escucha del servidor
 * - NODE_ENV: Entorno de ejecución (development/production)
 */
// Inicializa la aplicación NestJS
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Establece el prefijo global para los endpoints
  app.setGlobalPrefix('api');

  // Configura seguridad HTTP con Helmet
  if (process.env.ENABLE_HELMET === 'true') {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            ...(process.env.CSP_DIRECTIVES
              ? JSON.parse(process.env.CSP_DIRECTIVES)
              : {}),
          },
        },
      }),
    );
  }

  // Configura compresión de respuestas
  if (process.env.ENABLE_COMPRESSION === 'true') {
    app.use(
      compression({
        threshold: parseInt(process.env.COMPRESSION_THRESHOLD || '1024', 10),
        level: parseInt(process.env.COMPRESSION_LEVEL || '6', 10),
      }),
    );
  }

  // Configura validación global de peticiones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: process.env.VALIDATION_WHITELIST !== 'false',
      forbidNonWhitelisted:
        process.env.VALIDATION_FORBID_NON_WHITELISTED !== 'false',
      transform: process.env.VALIDATION_TRANSFORM !== 'false',
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );

  // Configura documentación API con Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API Base')
    .setDescription('API base con NestJS, MongoDB, métricas y observabilidad')
    .setVersion('1.0')
    .addTag('health', 'Endpoints de health check')
    .addTag('metrics', 'Endpoints de métricas y monitoreo')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Servidor iniciado en http://localhost:${port}`);
}

// Inicia la aplicación y maneja errores
bootstrap().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
  process.exit(1);
});
