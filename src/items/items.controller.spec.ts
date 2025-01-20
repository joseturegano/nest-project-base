import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Item, ItemSchema } from './schemas/item.schema';
import mongoose, { Document } from 'mongoose';
import { ItemResponseDto } from './dtos/item-response.dto';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

// Create a temporary model for testing
const ItemModel = mongoose.model<Item & Document>('Item', ItemSchema);

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: jest.Mocked<ItemsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get(ItemsService);
  });

  describe('findAll', () => {
    it('should return an array of items transformed to DTO', async () => {
      const mockDate = new Date();
      const mockItems = [
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item 1',
          description: 'Test Description 1',
          active: true,
          createdAt: mockDate,
          updatedAt: mockDate,
        }),
        new ItemModel({
          _id: new mongoose.Types.ObjectId(),
          name: 'Test Item 2',
          description: 'Test Description 2',
          active: false,
          createdAt: mockDate,
          updatedAt: mockDate,
        }),
      ];

      const pagination = new PaginationDto();
      service.findAll.mockResolvedValue(mockItems);

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toHaveLength(2);
      
      // Verify DTO transformation
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).not.toHaveProperty('_id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('isActive');
      expect(result[0]).not.toHaveProperty('active');
      expect(result[0]).toHaveProperty('createdAt');
      expect(result[0]).toHaveProperty('updatedAt');
    });

    it('should validate DTO transformation rules', async () => {
      const mockDate = new Date();
      const mockId = new mongoose.Types.ObjectId();
      const mockItem = new ItemModel({
        _id: mockId,
        name: 'Test Item',
        description: 'Test Description',
        active: true,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      const pagination = new PaginationDto();
      service.findAll.mockResolvedValue([mockItem]);

      const result = await controller.findAll(pagination);
      
      // Verify transformation rules through DTO
      const transformedItem = result[0];
      expect(transformedItem.id).toBe(mockId.toString());
      expect(transformedItem).not.toHaveProperty('active');
      expect(transformedItem).toMatchObject({
        id: mockId.toString(),
        name: mockItem.name,
        description: mockItem.description,
        isActive: mockItem.active,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString()
      });
    });

    it('should handle empty results', async () => {
      const pagination = new PaginationDto();
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll(pagination);

      expect(result).toEqual([]);
    });

    it('should validate pagination parameters', async () => {
      const invalidPagination = new PaginationDto();
      invalidPagination.limit = -1;
      invalidPagination.offset = -10;

      await expect(controller.findAll(invalidPagination)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle service errors', async () => {
      const pagination = new PaginationDto();
      service.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll(pagination)).rejects.toThrow(
        'Database error',
      );
    });

    it('should handle invalid item data transformation', async () => {
      const mockDate = new Date();
      const invalidItem = new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test Item',
        description: 'Test Description',
        active: true,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      // Create spy on plainToInstance
      const plainToInstanceSpy = jest.spyOn(
        { plainToInstance },
        'plainToInstance'
      ).mockImplementation(() => {
        throw new Error('Invalid transformation');
      });

      const pagination = new PaginationDto();
      service.findAll.mockResolvedValue([invalidItem]);

      await expect(controller.findAll(pagination)).rejects.toThrow(
        'Invalid transformation'
      );

      // Restore original implementation
      plainToInstanceSpy.mockRestore();
    });

    it('should validate pagination parameters types', async () => {
      const invalidPagination = {
        limit: 'invalid',
        offset: 'invalid'
      };

      await expect(controller.findAll(invalidPagination as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should validate response data types through DTO', async () => {
      const mockDate = new Date();
      const mockItem = new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test Item',
        description: 'Test Description',
        active: true,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      const pagination = new PaginationDto();
      service.findAll.mockResolvedValue([mockItem]);

      const result = await controller.findAll(pagination);
      const transformedItem = plainToInstance(ItemResponseDto, mockItem);
      
      expect(typeof transformedItem.id).toBe('string');
      expect(typeof transformedItem.name).toBe('string');
      expect(typeof transformedItem.description).toBe('string');
      expect(typeof transformedItem.isActive).toBe('boolean');
      expect(typeof transformedItem.createdAt).toBe('string');
      expect(typeof transformedItem.updatedAt).toBe('string');
    });

    it('should respect pagination limits', async () => {
      const mockDate = new Date();
      const mockItems = Array(5).fill(null).map(() => new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        name: 'Test Item',
        description: 'Test Description',
        active: true,
        createdAt: mockDate,
        updatedAt: mockDate,
      }));

      const pagination = new PaginationDto();
      pagination.limit = 5;
      pagination.offset = 10;

      service.findAll.mockResolvedValue(mockItems);

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toHaveLength(5);
      result.forEach(item => {
        expect(item).toMatchObject({
          name: 'Test Item',
          description: 'Test Description',
          isActive: true,
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString()
        });
      });
    });
  });
});
