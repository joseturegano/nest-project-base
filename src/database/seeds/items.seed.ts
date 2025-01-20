import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../../items/schemas/item.schema';

@Injectable()
export class ItemsSeeder {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) {}

  async seed() {
    const count = await this.itemModel.countDocuments();
    if (count === 0) {
      await this.itemModel.insertMany([
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
      console.log('Items seeded successfully');
    } else {
      console.log('Items collection is not empty, skipping seed');
    }
  }
}
