import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { Item, ItemSchema } from '../items/schemas/item.schema';
import { ItemsSeeder } from './seeds/items.seed';
import { SeedCommand } from './commands/seed.command';

/**
 * Módulo de base de datos que centraliza la configuración y operaciones relacionadas con MongoDB.
 *
 * Este módulo se encarga de:
 * - Configurar los modelos de Mongoose
 * - Proporcionar funcionalidades de seeding
 * - Exportar servicios relacionados con la base de datos
 *
 * Características principales:
 * - Registra el esquema de items en Mongoose
 * - Integra el módulo de comandos para ejecutar seeds
 * - Exporta el seeder de items para su uso en otros módulos
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    CommandModule,
  ],
  providers: [ItemsSeeder, SeedCommand],
  exports: [ItemsSeeder],
})
export class DatabaseModule {}
