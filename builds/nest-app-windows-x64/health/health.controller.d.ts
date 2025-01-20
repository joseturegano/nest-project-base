import { HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
export declare class HealthController {
    private health;
    private http;
    private mongoose;
    private memory;
    private disk;
    private configService;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, mongoose: MongooseHealthIndicator, memory: MemoryHealthIndicator, disk: DiskHealthIndicator, configService: ConfigService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    checkLiveness(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    checkReadiness(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
