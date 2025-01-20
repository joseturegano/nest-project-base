import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

describe('Configuration', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should load default configuration', () => {
    expect(configService.get('nodeEnv')).toBeDefined();
    expect(configService.get('port')).toBeDefined();
    expect(configService.get('mongodb.uri')).toBeDefined();
  });

  it('should validate required environment variables', () => {
    expect(() => configService.getOrThrow('mongodb.uri')).not.toThrow();
  });

  it('should have correct database configuration', () => {
    const dbConfig = configService.get('mongodb');
    expect(dbConfig).toHaveProperty('uri');
    expect(dbConfig).toHaveProperty('dbName');
    expect(dbConfig.uri).toBe('mongodb://localhost:27017');
    // Usar el valor de la variable de entorno en lugar de un valor hardcodeado
    expect(dbConfig.dbName).toBe(process.env.MONGODB_DB_NAME);
  });
});
