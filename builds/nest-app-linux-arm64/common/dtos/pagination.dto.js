"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "offset", void 0);
//# sourceMappingURL=pagination.dto.js.map