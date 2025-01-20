import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) {}

  async findAll(pagination: {
    limit?: number;
    offset?: number;
  }): Promise<Item[]> {
    const { limit, offset } = pagination;
    const query = this.itemModel.find({ active: true });

    if (offset) {
      query.skip(offset);
    }

    if (limit) {
      query.limit(limit);
    }

    return query.exec();
  }
}
