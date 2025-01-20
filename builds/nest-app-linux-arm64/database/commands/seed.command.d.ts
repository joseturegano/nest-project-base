import { ItemsSeeder } from '../seeds/items.seed';
export declare class SeedCommand {
    private readonly itemsSeeder;
    constructor(itemsSeeder: ItemsSeeder);
    seed(): Promise<void>;
}
