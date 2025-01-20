"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const metrics_service_1 = require("./metrics.service");
let MetricsInterceptor = class MetricsInterceptor {
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, path } = request;
        const timer = this.metricsService.startTimer();
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const response = context.switchToHttp().getResponse();
                const duration = timer();
                const status = response.statusCode;
                this.metricsService.incrementHttpRequests(method, path, status);
                this.metricsService.observeHttpRequestDuration(method, path, status, duration);
            },
            error: (error) => {
                const duration = timer();
                const status = error.status || 500;
                this.metricsService.incrementHttpRequests(method, path, status);
                this.metricsService.observeHttpRequestDuration(method, path, status, duration);
            },
        }));
    }
};
exports.MetricsInterceptor = MetricsInterceptor;
exports.MetricsInterceptor = MetricsInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsInterceptor);
//# sourceMappingURL=metrics.interceptor.js.map