"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
let HealthController = class HealthController {
    constructor(health, http, mongoose, memory, disk, configService) {
        this.health = health;
        this.http = http;
        this.mongoose = mongoose;
        this.memory = memory;
        this.disk = disk;
        this.configService = configService;
    }
    check() {
        const port = this.configService.get('PORT', 3000);
        return this.health.check([
            () => this.mongoose.pingCheck('mongodb'),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
            () => this.disk.checkStorage('disk', {
                thresholdPercent: 0.9,
                path: '/',
            }),
            () => this.http.pingCheck('docs', `http://localhost:${port}/docs`),
        ]);
    }
    checkLiveness() {
        return this.health.check([() => this.mongoose.pingCheck('mongodb')]);
    }
    checkReadiness() {
        const port = this.configService.get('PORT', 3000);
        return this.health.check([
            () => this.mongoose.pingCheck('mongodb'),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.http.pingCheck('docs', `http://localhost:${port}/docs`),
        ]);
    }
};
exports.HealthController = HealthController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar el estado de salud del sistema' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
tslib_1.__decorate([
    (0, common_1.Get)('liveness'),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar si la aplicación está viva' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "checkLiveness", null);
tslib_1.__decorate([
    (0, common_1.Get)('readiness'),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar si la aplicación está lista para recibir tráfico',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "checkReadiness", null);
exports.HealthController = HealthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health'),
    tslib_1.__metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.HttpHealthIndicator,
        terminus_1.MongooseHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator,
        config_1.ConfigService])
], HealthController);
//# sourceMappingURL=health.controller.js.map