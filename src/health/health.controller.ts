import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  private readonly memoryThreshold: number;
  private readonly diskThreshold: number;
  private readonly mongoTimeout: number;
  private readonly port: number;

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private configService: ConfigService,
  ) {
    this.memoryThreshold = this.configService.get<number>('health.memoryHeapThreshold', 500 * 1024 * 1024);
    this.diskThreshold = this.configService.get<number>('health.diskThresholdPercent', 0.9);
    this.mongoTimeout = this.configService.get<number>('health.mongodbTimeout', 5000);
    this.port = this.configService.get<number>('PORT', 3000);
  }

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Verificar el estado de salud del sistema' })
  check() {
    return this.health.check([
      () => this.mongoose.pingCheck('mongodb', { timeout: this.mongoTimeout }),
      () => this.memory.checkHeap('memory_heap', this.memoryThreshold),
      () => this.http.pingCheck('self', `http://localhost:${this.port}/api/health/liveness`),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: this.diskThreshold })
    ]);
  }

  @Get('liveness')
  @HealthCheck()
  @ApiOperation({ summary: 'Verificar si la aplicación está viva' })
  checkLiveness() {
    return this.health.check([
      () => this.mongoose.pingCheck('mongodb', { timeout: this.mongoTimeout })
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  @ApiOperation({ summary: 'Verificar si la aplicación está lista para recibir tráfico' })
  checkReadiness() {
    return this.health.check([
      () => this.mongoose.pingCheck('mongodb', { timeout: this.mongoTimeout }),
      () => this.memory.checkHeap('memory_heap', this.memoryThreshold),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: this.diskThreshold })
    ]);
  }
}
