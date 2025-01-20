import { NestFactory } from '@nestjs/core';
import { bootstrap } from './seeds';
import { CommandService } from 'nestjs-command';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    createApplicationContext: jest.fn().mockImplementation(async () => ({
      select: jest.fn().mockReturnThis(),
      get: jest.fn().mockImplementation(() => ({
        exec: jest.fn()
      })),
      close: jest.fn()
    })),
  },
}));

jest.mock('../app.module', () => ({
  AppModule: class {},
}));

describe('Seeds', () => {
  let mockCommandService: jest.Mocked<CommandService>;

  beforeEach(() => {
    mockCommandService = {
      exec: jest.fn(),
    } as unknown as jest.Mocked<CommandService>;

    (NestFactory.createApplicationContext as jest.Mock).mockImplementation(async () => ({
      select: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnValue(mockCommandService),
      close: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should bootstrap and execute commands', async () => {
    mockCommandService.exec.mockResolvedValue(undefined);
    
    await bootstrap();
    
    expect(NestFactory.createApplicationContext).toHaveBeenCalled();
    expect(mockCommandService.exec).toHaveBeenCalled();
  });

  it('should handle errors during command execution', async () => {
    const testError = new Error('Test error');
    mockCommandService.exec.mockRejectedValue(testError);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    await bootstrap();
    
    expect(consoleSpy).toHaveBeenCalledWith(testError);
  });
});