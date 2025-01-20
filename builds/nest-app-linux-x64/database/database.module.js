"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_command_1 = require("nestjs-command");
const item_schema_1 = require("../items/schemas/item.schema");
const items_seed_1 = require("./seeds/items.seed");
const seed_command_1 = require("./commands/seed.command");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema }]),
            nestjs_command_1.CommandModule,
        ],
        providers: [items_seed_1.ItemsSeeder, seed_command_1.SeedCommand],
        exports: [items_seed_1.ItemsSeeder],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map