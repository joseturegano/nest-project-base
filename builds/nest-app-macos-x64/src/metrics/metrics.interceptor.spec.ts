import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { MetricsInterceptor } from './metrics.interceptor';
import { MetricsService } from './metrics.service';

describe('MetricsInterceptor', () => {
  let interceptor: MetricsInterceptor;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsInterceptor,
        {
          provide: MetricsService,
          useValue: {
            observeHttpRequestDuration: jest.fn(),
            incrementHttpRequests: jest.fn(),
            startTimer: jest.fn().mockReturnValue(() => 100),
          },
        },
      ],
    }).compile();

    interceptor = module.get<MetricsInterceptor>(MetricsInterceptor);
    metricsService = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('should record metrics for successful requests', (done) => {
      jest.setTimeout(120000);
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            method: 'GET',
            route: { path: '/test' },
          }),
        }),
      } as ExecutionContext;

      const next: CallHandler = {
        handle: () => of({ data: 'test' }),
      };

      const startTime = Date.now();
      jest.spyOn(Date, 'now').mockReturnValueOnce(startTime);

      interceptor.intercept(context, next).subscribe({
        next: () => {
          expect(metricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            '/test',
            200,
          );
          expect(
            metricsService.observeHttpRequestDuration,
          ).toHaveBeenCalledWith('GET', '/test', expect.any(Number));
          done();
        },
      });
    });

    it('should record metrics for failed requests', (done) => {
      jest.setTimeout(120000);
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            method: 'POST',
            route: { path: '/test' },
          }),
        }),
      } as ExecutionContext;

      const error = new Error('Test error');
      const next: CallHandler = {
        handle: () =>
          new Observable((subscriber) => {
            subscriber.error(error);
          }),
      };

      const startTime = Date.now();
      jest.spyOn(Date, 'now').mockReturnValueOnce(startTime);

      interceptor.intercept(context, next).subscribe({
        error: (err) => {
          expect(err).toBe(error);
          expect(metricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'POST',
            '/test',
            500,
          );
          expect(
            metricsService.observeHttpRequestDuration,
          ).toHaveBeenCalledWith('POST', '/test', expect.any(Number));
          done();
        },
      });
    });

    it('should handle requests without route path', (done) => {
      jest.setTimeout(120000);
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            method: 'GET',
            route: {},
          }),
        }),
      } as ExecutionContext;

      const next: CallHandler = {
        handle: () => of({ data: 'test' }),
      };

      interceptor.intercept(context, next).subscribe({
        next: () => {
          expect(metricsService.incrementHttpRequests).toHaveBeenCalledWith(
            'GET',
            'unknown',
            200,
          );
          expect(
            metricsService.observeHttpRequestDuration,
          ).toHaveBeenCalledWith('GET', 'unknown', expect.any(Number));
          done();
        },
      });
    });
  });
});
