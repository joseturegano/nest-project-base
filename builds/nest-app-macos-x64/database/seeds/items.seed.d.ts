import { Model } from 'mongoose';
import { Item } from '../../items/schemas/item.schema';
export declare class ItemsSeeder {
    private readonly itemModel;
    constructor(itemModel: Model<Item>);
    seed(): Promise<void>;
}
