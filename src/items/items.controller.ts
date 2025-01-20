import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos/pagination.dto';

@ApiTags('items')
@Controller('/api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los items activos',
    description: 'Retorna items paginados usando limit y offset'
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número máximo de items a retornar',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de items a saltar',
    example: 0,
  })
  @ApiOkResponse({
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
  })
  @ApiResponse({
    status: 400,
    description: 'Parámetros de paginación inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  async findAll(@Query() pagination: PaginationDto) {
    return this.itemsService.findAll(pagination);
  }
}
