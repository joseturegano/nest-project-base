"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = exports.Item = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Item = class Item extends mongoose_2.Document {
};
exports.Item = Item;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Item.prototype, "active", void 0);
exports.Item = Item = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        versionKey: false,
    })
], Item);
exports.ItemSchema = mongoose_1.SchemaFactory.createForClass(Item);
//# sourceMappingURL=item.schema.js.map