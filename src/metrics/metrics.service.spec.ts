import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { Counter, Histogram } from 'prom-client';
import {
  METRIC_HTTP_REQUESTS_TOTAL,
  METRIC_HTTP_REQUEST_DURATION_SECONDS,
} from './metrics.constants';

describe('MetricsService', () => {
  let service: MetricsService;
  let httpRequestsCounter: jest.Mocked<Counter<string>>;
  let httpRequestDuration: jest.Mocked<Histogram<string>>;

  beforeEach(async () => {
    httpRequestsCounter = {
      inc: jest.fn(),
    } as any;

    httpRequestDuration = {
      observe: jest.fn(),
      startTimer: jest.fn().mockReturnValue(() => 100),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: METRIC_HTTP_REQUESTS_TOTAL,
          useValue: httpRequestsCounter,
        },
        {
          provide: METRIC_HTTP_REQUEST_DURATION_SECONDS,
          useValue: httpRequestDuration,
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('incrementHttpRequests', () => {
    it('should increment counter with correct labels', () => {
      const method = 'GET';
      const path = '/test';
      const status = 200;

      service.incrementHttpRequests(method, path, status);

      expect(httpRequestsCounter.inc).toHaveBeenCalledWith({
        method,
        path,
        status: status.toString(),
      });
    });
  });

  describe('observeHttpRequestDuration', () => {
    it('should observe duration with correct labels', () => {
      const method = 'POST';
      const path = '/api';
      const status = 201;
      const duration = 0.5;

      service.observeHttpRequestDuration(method, path, status, duration);

      expect(httpRequestDuration.observe).toHaveBeenCalledWith(
        {
          method,
          path,
          status: status.toString(),
        },
        duration,
      );
    });
  });

  describe('startTimer', () => {
    it('should return timer function from histogram', () => {
      const timerFn = service.startTimer();

      expect(httpRequestDuration.startTimer).toHaveBeenCalled();
      expect(typeof timerFn).toBe('function');

      const duration = timerFn();
      expect(duration).toBe(100);
    });
  });
});
