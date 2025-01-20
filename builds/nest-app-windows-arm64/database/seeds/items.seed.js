"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsSeeder = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("../../items/schemas/item.schema");
let ItemsSeeder = class ItemsSeeder {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
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
        }
        else {
            console.log('Items collection is not empty, skipping seed');
        }
    }
};
exports.ItemsSeeder = ItemsSeeder;
exports.ItemsSeeder = ItemsSeeder = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], ItemsSeeder);
//# sourceMappingURL=items.seed.js.map