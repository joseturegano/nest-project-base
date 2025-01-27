import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: jest.Mocked<HealthCheckService>;
  let configService: jest.Mocked<ConfigService>;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Spy on the Logger prototype before any controller instantiation
    loggerSpy = jest.spyOn(Logger.prototype, 'log');

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: HttpHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: MongooseHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: {
            checkHeap: jest.fn(),
          },
        },
        {
          provide: DiskHealthIndicator,
          useValue: {
            checkStorage: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key: string, defaultValue: any) => {
                switch (key) {
                  case 'health.memoryHeapThreshold':
                    return 500 * 1024 * 1024;
                  case 'health.diskThresholdPercent':
                    return 0.9;
                  case 'health.mongodbTimeout':
                    return 5000;
                  case 'PORT':
                    return 3000;
                  default:
                    return defaultValue;
                }
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get(HealthCheckService);
    configService = module.get(ConfigService);
  });

  describe('constructor', () => {
    it('should initialize with correct configuration values', () => {
      expect(controller).toBeDefined();
      expect(configService.get).toHaveBeenCalledTimes(4);
      expect(loggerSpy).toHaveBeenCalledWith(
        'Health check configured with: Memory threshold: 500MB Disk threshold: 90% MongoDB timeout: 5000ms',
      );
      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('check', () => {
    it('should perform all health checks', async () => {
      const mockResult = {
        status: 'ok' as const,
        details: {
          mongodb: { status: 'up' as const },
          memory_heap: { status: 'up' as const },
          self: { status: 'up' as const },
          storage: { status: 'up' as const },
        },
      };
      healthCheckService.check.mockResolvedValue(mockResult);

      const result = await controller.check();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function), // MongoDB check
        expect.any(Function), // Memory check
        expect.any(Function), // HTTP check
        expect.any(Function), // Disk check
      ]);
      expect(result).toEqual(mockResult);
    });

    it('should handle health check errors', async () => {
      healthCheckService.check.mockRejectedValue(
        new Error('Health check failed'),
      );

      await expect(controller.check()).rejects.toThrow('Health check failed');
    });
  });

  describe('checkLiveness', () => {
    it('should perform MongoDB health check', async () => {
      const mockResult = {
        status: 'ok' as const,
        details: {
          mongodb: { status: 'up' as const },
        },
      };
      healthCheckService.check.mockResolvedValue(mockResult);

      const result = await controller.checkLiveness();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function), // MongoDB check
      ]);
      expect(result).toEqual(mockResult);
    });
  });

  describe('checkReadiness', () => {
    it('should perform readiness checks', async () => {
      const mockResult = {
        status: 'ok' as const,
        details: {
          mongodb: { status: 'up' as const },
          memory_heap: { status: 'up' as const },
          storage: { status: 'up' as const },
        },
      };
      healthCheckService.check.mockResolvedValue(mockResult);

      const result = await controller.checkReadiness();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function), // MongoDB check
        expect.any(Function), // Memory check
        expect.any(Function), // Disk check
      ]);
      expect(result).toEqual(mockResult);
    });
  });
});
