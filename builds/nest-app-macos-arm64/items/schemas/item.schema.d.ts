import { Document } from 'mongoose';
export declare class Item extends Document {
    name: string;
    description: string;
    active: boolean;
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item> & Item & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>> & import("mongoose").FlatRecord<Item> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
