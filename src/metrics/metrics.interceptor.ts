import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method } = request;
    const path = request.route?.path || 'unknown';
    const timer = this.metricsService.startTimer();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const duration = timer();
          const status = response.statusCode;

          this.metricsService.incrementHttpRequests(method, path, status);
          this.metricsService.observeHttpRequestDuration(
            method,
            path,
            status,
            duration,
          );
        },
        error: (error) => {
          const duration = timer();
          const status = error.status || 500;

          this.metricsService.incrementHttpRequests(method, path, status);
          this.metricsService.observeHttpRequestDuration(
            method,
            path,
            status,
            duration,
          );
        },
      }),
    );
  }
}
