"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
let ItemsController = class ItemsController {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async findAll(pagination) {
        return this.itemsService.findAll(pagination);
    }
};
exports.ItemsController = ItemsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los items activos',
        description: `Este endpoint permite obtener todos los items activos del sistema.
    \nPuede ser paginado usando los parámetros limit y offset.
    \nEjemplo: /api/items?limit=10&offset=20`,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Número máximo de items a retornar',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        description: 'Número de items a saltar',
        example: 0,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de items obtenida exitosamente',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '64b8f5f5e4b0a1a2b3c4d5e6' },
                    name: { type: 'string', example: 'Item 1' },
                    description: { type: 'string', example: 'Descripción del item 1' },
                    active: { type: 'boolean', example: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Parámetros de paginación inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error interno del servidor',
    }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemsController.prototype, "findAll", null);
exports.ItemsController = ItemsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('items'),
    (0, common_1.Controller)('/api/items'),
    tslib_1.__metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map