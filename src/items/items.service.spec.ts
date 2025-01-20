import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import mongoose from 'mongoose';
import { BadRequestException } from '@nestjs/common';

// Create a temporary model for testing
const ItemModel = mongoose.model<Item>('Item', ItemSchema);

describe('ItemsService', () => {
  let service: ItemsService;
  let model: mongoose.Model<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken(Item.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    model = module.get<mongoose.Model<Item>>(getModelToken(Item.name));
  });

  describe('findAll', () => {
    it('should return items with pagination', async () => {
      const mockItems = [
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item 1',
          description: 'Test Description 1',
          active: true,
          createdAt: new Date('2023-01-01T00:00:00Z'),
          updatedAt: new Date('2023-01-02T00:00:00Z'),
        }),
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item 2',
          description: 'Test Description 2',
          active: true,
          createdAt: new Date('2023-01-03T00:00:00Z'),
          updatedAt: new Date('2023-01-04T00:00:00Z'),
        }),
      ];

      // Test date formatting
      expect(mockItems[0].createdAt.toISOString()).toBe('2023-01-01T00:00:00.000Z');
      expect(mockItems[0].updatedAt.toISOString()).toBe('2023-01-02T00:00:00.000Z');

      const findSpy = jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockItems),
      } as any);

      const result = await service.findAll({ limit: 10, offset: 0 });

      expect(findSpy).toHaveBeenCalledWith({ active: true });
      expect(result).toEqual(mockItems);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('isActive', true);
      expect(result[0]).toHaveProperty('createdAt');
      expect(result[0]).toHaveProperty('updatedAt');
    });

    it('should verify mongoose method calls with correct parameters', async () => {
      const mockItems = [new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test Item',
        description: 'Test Description',
        active: true,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-02T00:00:00Z'),
      })];

      // Test date formatting
      expect(mockItems[0].createdAt.toISOString()).toBe('2023-01-01T00:00:00.000Z');
      expect(mockItems[0].updatedAt.toISOString()).toBe('2023-01-02T00:00:00.000Z');

      const findSpy = jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockImplementation((num) => {
          expect(num).toBe(20);
          return this;
        }),
        limit: jest.fn().mockImplementation((num) => {
          expect(num).toBe(15);
          return this;
        }),
        exec: jest.fn().mockResolvedValue(mockItems),
      } as any);

      await service.findAll({ limit: 15, offset: 20 });
      
      expect(findSpy).toHaveBeenCalledWith({ active: true });
    });

    it('should throw BadRequestException for invalid pagination', async () => {
      await expect(service.findAll({ limit: -1 })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.findAll({ offset: -10 })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle database errors', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      } as any);

      await expect(service.findAll({})).rejects.toThrow('Database error');
    });

    it('should handle large datasets efficiently', async () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => 
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: `Item ${i}`,
          description: `Description ${i}`,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(largeDataset),
      } as any);

      const startTime = performance.now();
      const result = await service.findAll({ limit: 1000 });
      const endTime = performance.now();

      expect(result).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should return items in correct order', async () => {
      const mockItems = [
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Item 1',
          description: 'Description 1',
          active: true,
          createdAt: new Date('2023-01-01T00:00:00Z'),
          updatedAt: new Date('2023-01-02T00:00:00Z'),
        }),
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Item 2',
          description: 'Description 2',
          active: true,
          createdAt: new Date('2023-01-03T00:00:00Z'),
          updatedAt: new Date('2023-01-04T00:00:00Z'),
        }),
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockItems),
      } as any);

      const result = await service.findAll({});
      expect(result[0].name).toBe('Item 1');
      expect(result[1].name).toBe('Item 2');
    });

    it('should return empty array when no items found', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.findAll({});
      expect(result).toEqual([]);
    });

    it('should apply default pagination values', async () => {
      const mockItems = [
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item',
          description: 'Test Description',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockItems),
      } as any);

      const result = await service.findAll({});
      expect(result).toHaveLength(1);
      expect(model.find().skip).toHaveBeenCalledWith(0);
      expect(model.find().limit).not.toHaveBeenCalled();
    });

    it('should filter only active items', async () => {
      const mockItems = [
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item',
          description: 'Test Description',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockItems),
      } as any);

      await service.findAll({});
      expect(model.find).toHaveBeenCalledWith({ active: true });
    });
  });
});
