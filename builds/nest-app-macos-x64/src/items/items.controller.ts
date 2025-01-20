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

/**
 * Controlador para manejar las peticiones HTTP relacionadas con los items/recursos
 *
 * Este controlador define los endpoints REST para interactuar con los items.
 * Utiliza el decorador @Controller para definir la ruta base '/api/items'.
 *
 * Responsabilidades principales:
 * - Definir los endpoints REST para operaciones CRUD
 * - Manejar la validación de datos de entrada
 * - Transformar y formatear respuestas HTTP
 * - Gestionar códigos de estado HTTP apropiados
 * - Proporcionar documentación OpenAPI/Swagger
 */
@ApiTags('items')
@Controller('/api/items')
export class ItemsController {
  /**
   * Constructor del controlador
   * @param itemsService - Instancia del servicio ItemsService
   */
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Endpoint GET para obtener todos los items activos con paginación
   * @param pagination - DTO de paginación con limit y offset
   * @returns Promise<Item[]> - Lista paginada de items activos
   *
   * Características:
   * - Retorna un array de items en formato JSON
   * - Solo incluye items con active: true
   * - Soporta paginación mediante parámetros query
   * - Usa código de estado HTTP 200 (OK) en caso de éxito
   * - Maneja errores con códigos apropiados
   *
   * Parámetros de paginación:
   * - limit: Número máximo de items por página (default: 10, max: 100)
   * - offset: Número de items a saltar (default: 0)
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los items activos',
    description: `Este endpoint permite obtener todos los items activos del sistema.
    \nPuede ser paginado usando los parámetros limit y offset.
    \nEjemplo: /api/items?limit=10&offset=20`,
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
