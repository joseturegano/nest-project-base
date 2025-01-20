"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const metrics_controller_1 = require("./metrics.controller");
const metrics_service_1 = require("./metrics.service");
let MetricsModule = class MetricsModule {
};
exports.MetricsModule = MetricsModule;
exports.MetricsModule = MetricsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prometheus_1.PrometheusModule.register({
                path: '/metrics',
                defaultMetrics: {
                    enabled: true,
                },
            }),
        ],
        controllers: [metrics_controller_1.MetricsController],
        providers: [
            metrics_service_1.MetricsService,
            (0, nestjs_prometheus_1.makeCounterProvider)({
                name: 'http_requests_total',
                help: 'Total de solicitudes HTTP',
                labelNames: ['method', 'path', 'status'],
            }),
            (0, nestjs_prometheus_1.makeHistogramProvider)({
                name: 'http_request_duration_seconds',
                help: 'Duración de las solicitudes HTTP en segundos',
                labelNames: ['method', 'path', 'status'],
                buckets: [0.1, 0.5, 1, 2, 5],
            }),
        ],
        exports: [metrics_service_1.MetricsService],
    })
], MetricsModule);
//# sourceMappingURL=metrics.module.js.map