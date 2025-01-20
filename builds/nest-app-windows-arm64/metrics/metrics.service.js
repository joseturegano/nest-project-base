"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let MetricsService = class MetricsService {
    constructor(httpRequestsCounter, httpRequestDuration) {
        this.httpRequestsCounter = httpRequestsCounter;
        this.httpRequestDuration = httpRequestDuration;
    }
    incrementHttpRequests(method, path, status) {
        this.httpRequestsCounter.inc({ method, path, status: status.toString() });
    }
    observeHttpRequestDuration(method, path, status, duration) {
        this.httpRequestDuration.observe({ method, path, status: status.toString() }, duration);
    }
    startTimer() {
        return this.httpRequestDuration.startTimer();
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_prometheus_1.InjectMetric)('http_requests_total')),
    tslib_1.__param(1, (0, nestjs_prometheus_1.InjectMetric)('http_request_duration_seconds')),
    tslib_1.__metadata("design:paramtypes", [prom_client_1.Counter,
        prom_client_1.Histogram])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map