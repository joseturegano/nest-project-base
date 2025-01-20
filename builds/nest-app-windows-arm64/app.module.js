"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const health_module_1 = require("./health/health.module");
const metrics_module_1 = require("./metrics/metrics.module");
const items_module_1 = require("./items/items.module");
const database_module_1 = require("./database/database.module");
const configuration_1 = tslib_1.__importStar(require("./config/configuration"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validate: configuration_1.validate,
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            }),
            mongoose_1.MongooseModule.forRootAsync({
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
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => [
                    {
                        ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
                        limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
                    },
                ],
            }),
            health_module_1.HealthModule,
            metrics_module_1.MetricsModule,
            items_module_1.ItemsModule,
            database_module_1.DatabaseModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map