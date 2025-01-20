import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './schemas/item.schema';

/**
 * Módulo que gestiona la funcionalidad relacionada con los items.
 * Incluye:
 * - Definición del esquema MongoDB para los items
 * - Controlador para manejar las rutas API
 * - Servicio con la lógica de negocio
 */
@Module({
  imports: [
    // Registra el esquema de items en Mongoose
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController], // Controlador para rutas API
  providers: [ItemsService], // Servicio con lógica de negocio
})
export class ItemsModule {}
