import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';

/**
 * Servicio para manejar operaciones CRUD relacionadas con los items/recursos.
 *
 * Este servicio actúa como capa de abstracción entre el controlador y la base de datos,
 * proporcionando métodos para interactuar con la colección de items en MongoDB.
 */
@Injectable()
export class ItemsService {
  /**
   * Constructor del servicio
   * @param itemModel - Modelo de Mongoose para la colección de items
   */
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) {}

  /**
   * Obtiene todos los items activos con paginación
   * @param pagination - Objeto con parámetros de paginación (limit, offset)
   * @returns Promise<Item[]> - Lista paginada de items activos
   *
   * Características:
   * - Filtra solo los items activos (active: true)
   * - Aplica paginación usando skip() y limit() de Mongoose
   * - Retorna una promesa que resuelve a un array de items
   */
  async findAll(pagination: {
    limit?: number;
    offset?: number;
  }): Promise<Item[]> {
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
}
