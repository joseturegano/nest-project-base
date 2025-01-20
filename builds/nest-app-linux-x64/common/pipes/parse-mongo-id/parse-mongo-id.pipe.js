"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMongoIdPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ParseMongoIdPipe = class ParseMongoIdPipe {
    transform(value, { data }) {
        if (!(0, mongoose_1.isValidObjectId)(value)) {
            throw new common_1.BadRequestException(`${data || 'ID'} debe ser un MongoId válido`);
        }
        return value;
    }
};
exports.ParseMongoIdPipe = ParseMongoIdPipe;
exports.ParseMongoIdPipe = ParseMongoIdPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseMongoIdPipe);
//# sourceMappingURL=parse-mongo-id.pipe.js.map