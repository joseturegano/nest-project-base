import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  // El endpoint /metrics es manejado automáticamente por @willsoto/nestjs-prometheus
}
