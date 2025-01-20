import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema de Mongoose para la colección de items/recursos
 *
 * Define la estructura de los documentos en la colección de items,
 * incluyendo sus propiedades y validaciones. Este esquema es la base
 * para todas las operaciones CRUD relacionadas con los items.
 *
 * Características principales:
 * - Define la estructura de datos para persistencia en MongoDB
 * - Proporciona validación de datos a nivel de esquema
 * - Gestiona automáticamente timestamps (createdAt, updatedAt)
 * - Permite la creación de índices y optimizaciones
 * - Implementa soft-delete mediante el campo active
 *
 * @Schema - Configuración del esquema:
 * - timestamps: true - Agrega automáticamente campos createdAt y updatedAt
 * - versionKey: false - Deshabilita el campo __v de versionado
 */
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Item extends Document {
  /**
   * Nombre del item
   * @Prop - Configuración de la propiedad:
   * - required: true - El campo es obligatorio
   */
  @Prop({ required: true })
  name: string;

  /**
   * Descripción del item
   * @Prop - Configuración de la propiedad:
   * - required: true - El campo es obligatorio
   */
  @Prop({ required: true })
  description: string;

  /**
   * Estado activo/inactivo del item
   * @Prop - Configuración de la propiedad:
   * - default: true - Valor por defecto es true (activo)
   */
  @Prop({ default: true })
  active: boolean;
}

/**
 * Esquema de Mongoose generado a partir de la clase Item
 *
 * Se exporta para ser utilizado en los modelos y repositorios
 * de la aplicación.
 */
export const ItemSchema = SchemaFactory.createForClass(Item);
