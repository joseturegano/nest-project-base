"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class EnvironmentVariables {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "TZ", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_URI", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_DB_NAME", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_USER", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_PASSWORD", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_AUTH_SOURCE", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "MONGODB_RETRY_WRITES", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "MONGODB_RETRY_READS", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "MONGODB_MAX_POOL_SIZE", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "MONGODB_MIN_POOL_SIZE", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "LOG_LEVEL", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "LOG_FORMAT", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_REQUEST_LOGGING", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_RESPONSE_LOGGING", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_ERROR_LOGGING", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "OTLP_ENDPOINT", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_METRICS", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "METRICS_PORT", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_RATE_LIMIT", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "RATE_LIMIT_WINDOW_MS", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "RATE_LIMIT_MAX_REQUESTS", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], EnvironmentVariables.prototype, "CORS_ORIGIN", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_HELMET", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_COMPRESSION", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "CACHE_TTL", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], EnvironmentVariables.prototype, "CACHE_MAX_ITEMS", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ENABLE_CACHE", void 0);
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToClass)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.default = () => ({
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
        rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
        rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
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
//# sourceMappingURL=configuration.js.map