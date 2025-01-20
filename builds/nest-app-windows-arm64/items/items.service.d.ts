import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
export declare class ItemsService {
    private readonly itemModel;
    constructor(itemModel: Model<Item>);
    findAll(pagination: {
        limit?: number;
        offset?: number;
    }): Promise<Item[]>;
}
