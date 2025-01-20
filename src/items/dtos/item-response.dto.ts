import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

/**
 * DTO para la respuesta de items
 */
export class ItemResponseDto {
  @ApiProperty({
    description: 'ID único del item',
    example: '64b8f5f5e4b0a1a2b3c4d5e6',
  })
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @ApiProperty({
    description: 'Nombre del item',
    example: 'Item 1',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Descripción del item',
    example: 'Descripción del item 1',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Indica si el item está activo',
    example: true,
  })
  @Expose({ name: 'isActive' })
  @Transform(({ obj }) => obj.active)
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2023-07-20T12:34:56.789Z',
  })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2023-07-20T12:34:56.789Z',
  })
  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt: Date;
}
