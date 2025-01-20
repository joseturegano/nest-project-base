import { Test, TestingModule } from '@nestjs/testing';
import { ItemsSeeder } from './items.seed';
import { getModelToken } from '@nestjs/mongoose';
import { Item } from '../../items/schemas/item.schema';
import mongoose from 'mongoose';

describe('ItemsSeeder', () => {
  let seeder: ItemsSeeder;
  let itemModel: mongoose.Model<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsSeeder,
        {
          provide: getModelToken(Item.name),
          useValue: {
            countDocuments: jest.fn(),
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    seeder = module.get<ItemsSeeder>(ItemsSeeder);
    itemModel = module.get<mongoose.Model<Item>>(getModelToken(Item.name));
  });

  describe('seed', () => {
    it('should seed items when collection is empty', async () => {
      jest.spyOn(itemModel, 'countDocuments').mockResolvedValue(0);
      const insertSpy = jest.spyOn(itemModel, 'insertMany').mockResolvedValue([]);

      await seeder.seed();

      expect(itemModel.countDocuments).toHaveBeenCalled();
      expect(insertSpy).toHaveBeenCalledWith([
        {
          name: 'Test Item 1',
          description: 'Descripción del item de prueba 1',
          active: true,
        },
        {
          name: 'Test Item 2',
          description: 'Descripción del item de prueba 2',
          active: true,
        },
        {
          name: 'Test Item 3',
          description: 'Descripción del item de prueba 3',
          active: false,
        },
      ]);
    });

    it('should not seed items when collection is not empty', async () => {
      jest.spyOn(itemModel, 'countDocuments').mockResolvedValue(1);
      const insertSpy = jest.spyOn(itemModel, 'insertMany');

      await seeder.seed();

      expect(itemModel.countDocuments).toHaveBeenCalled();
      expect(insertSpy).not.toHaveBeenCalled();
    });

    it('should handle insertMany errors', async () => {
      jest.spyOn(itemModel, 'countDocuments').mockResolvedValue(0);
      jest.spyOn(itemModel, 'insertMany').mockRejectedValue(new Error('Insert failed'));

      await expect(seeder.seed()).rejects.toThrow('Insert failed');
    });
  });
});