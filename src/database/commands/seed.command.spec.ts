import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SeedCommand } from './seed.command';
import { ItemsModule } from '../../items/items.module';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from '../../items/schemas/item.schema';
import { ItemsSeeder } from '../seeds/items.seed';

describe('SeedCommand', () => {
  let command: SeedCommand;
  let mongoServer: MongoMemoryServer;
  let itemsSeeder: jest.Mocked<ItemsSeeder>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        ItemsModule,
      ],
      providers: [
        SeedCommand,
        {
          provide: ItemsSeeder,
          useValue: {
            seed: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getModelToken(Item.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    command = module.get<SeedCommand>(SeedCommand);
    itemsSeeder = module.get<ItemsSeeder>(ItemsSeeder) as jest.Mocked<ItemsSeeder>;
  });

  afterAll(async () => {
    await mongoServer.stop();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(command).toBeDefined();
  });

  it('should seed items successfully', async () => {
    await command.seed();
    expect(itemsSeeder.seed).toHaveBeenCalled();
  });

  it('should handle errors during seeding', async () => {
    const testError = new Error('Test error');
    itemsSeeder.seed.mockRejectedValueOnce(testError);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    await command.seed();
    
    expect(consoleSpy).toHaveBeenCalledWith('Error seeding items:', testError);
  });
});