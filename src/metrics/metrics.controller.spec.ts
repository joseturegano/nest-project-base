import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';

describe('MetricsController', () => {
  let controller: MetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have ApiTags decorator with "Metrics"', () => {
    const apiTags = Reflect.getMetadata('swagger/apiUseTags', MetricsController);
    expect(apiTags).toEqual(['Metrics']);
  });

  it('should have Controller decorator with "metrics" route', () => {
    const controllerRoute = Reflect.getMetadata('path', MetricsController);
    expect(controllerRoute).toBe('metrics');
  });
});