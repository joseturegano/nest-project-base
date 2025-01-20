import { Controller, Get } from '@nestjs/common';
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
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Verificar el estado de salud del sistema' })
  check() {
    const port = this.configService.get<number>('PORT', 3000);
    return this.health.check([
      // MongoDB check
      () => this.mongoose.pingCheck('mongodb'),

      // Memory check
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024), // 150MB

      // Disk check
      () =>
        this.disk.checkStorage('disk', {
          thresholdPercent: 0.9, // 90%
          path: '/',
        }),

      // External dependencies check
      () => this.http.pingCheck('docs', `http://localhost:${port}/docs`),
    ]);
  }

  @Get('liveness')
  @HealthCheck()
  @ApiOperation({ summary: 'Verificar si la aplicación está viva' })
  checkLiveness() {
    return this.health.check([() => this.mongoose.pingCheck('mongodb')]);
  }

  @Get('readiness')
  @HealthCheck()
  @ApiOperation({
    summary: 'Verificar si la aplicación está lista para recibir tráfico',
  })
  checkReadiness() {
    const port = this.configService.get<number>('PORT', 3000);
    return this.health.check([
      () => this.mongoose.pingCheck('mongodb'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.http.pingCheck('docs', `http://localhost:${port}/docs`),
    ]);
  }
}
