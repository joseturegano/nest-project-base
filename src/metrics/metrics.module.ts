import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { METRIC_HTTP_REQUESTS_TOTAL, METRIC_HTTP_REQUEST_DURATION_SECONDS } from './metrics.constants';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    {
      provide: METRIC_HTTP_REQUESTS_TOTAL,
      useValue: 'http_requests_total',
    },
    {
      provide: METRIC_HTTP_REQUEST_DURATION_SECONDS,
      useValue: 'http_request_duration_seconds',
    },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
