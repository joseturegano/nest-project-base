import { Injectable, Inject } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';
import { METRIC_HTTP_REQUESTS_TOTAL, METRIC_HTTP_REQUEST_DURATION_SECONDS } from './metrics.constants';

@Injectable()
export class MetricsService {
  constructor(
    @Inject(METRIC_HTTP_REQUESTS_TOTAL)
    private readonly httpRequestsCounter: Counter<string>,
    @Inject(METRIC_HTTP_REQUEST_DURATION_SECONDS)
    private readonly httpRequestDuration: Histogram<string>,
  ) {}

  incrementHttpRequests(method: string, path: string, status: number): void {
    this.httpRequestsCounter.inc({ method, path, status: status.toString() });
  }

  observeHttpRequestDuration(
    method: string,
    path: string,
    status: number,
    duration: number,
  ): void {
    this.httpRequestDuration.observe(
      { method, path, status: status.toString() },
      duration,
    );
  }

  startTimer(): () => number {
    return this.httpRequestDuration.startTimer();
  }
}
