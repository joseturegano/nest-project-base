import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly httpRequestsCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly httpRequestDuration: Histogram<string>,
  ) {}

  // Incrementar contador de solicitudes
  incrementHttpRequests(method: string, path: string, status: number): void {
    this.httpRequestsCounter.inc({ method, path, status: status.toString() });
  }

  // Registrar duración de solicitud
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

  // Método para iniciar el temporizador de una solicitud
  startTimer(): () => number {
    return this.httpRequestDuration.startTimer();
  }
}
