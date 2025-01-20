"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const items_controller_1 = require("./items.controller");
const items_service_1 = require("./items.service");
const item_schema_1 = require("./schemas/item.schema");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema }]),
        ],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService],
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map