"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("./schemas/item.schema");
let ItemsService = class ItemsService {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    async findAll(pagination) {
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
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], ItemsService);
//# sourceMappingURL=items.service.js.map