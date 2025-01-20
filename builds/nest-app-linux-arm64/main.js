"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compression_1 = tslib_1.__importDefault(require("compression"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    if (process.env.ENABLE_HELMET === 'true') {
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    ...helmet_1.default.contentSecurityPolicy.getDefaultDirectives(),
                    ...(process.env.CSP_DIRECTIVES
                        ? JSON.parse(process.env.CSP_DIRECTIVES)
                        : {}),
                },
            },
        }));
    }
    if (process.env.ENABLE_COMPRESSION === 'true') {
        app.use((0, compression_1.default)({
            threshold: parseInt(process.env.COMPRESSION_THRESHOLD || '1024', 10),
            level: parseInt(process.env.COMPRESSION_LEVEL || '6', 10),
        }));
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: process.env.VALIDATION_WHITELIST !== 'false',
        forbidNonWhitelisted: process.env.VALIDATION_FORBID_NON_WHITELISTED !== 'false',
        transform: process.env.VALIDATION_TRANSFORM !== 'false',
        disableErrorMessages: process.env.NODE_ENV === 'production',
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS API Base')
        .setDescription('API base con NestJS, MongoDB, métricas y observabilidad')
        .setVersion('1.0')
        .addTag('health', 'Endpoints de health check')
        .addTag('metrics', 'Endpoints de métricas y monitoreo')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
bootstrap().catch((error) => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map