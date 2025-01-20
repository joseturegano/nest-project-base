import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParseMongoIdPipe } from './parse-mongo-id.pipe';

describe('ParseMongoIdPipe', () => {
  let pipe: ParseMongoIdPipe;
  const metadata: ArgumentMetadata = {
    type: 'param',
    metatype: String,
    data: 'id',
  };

  beforeEach(() => {
    pipe = new ParseMongoIdPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should transform a valid MongoId', () => {
    const validMongoId = '507f1f77bcf86cd799439011';
    expect(pipe.transform(validMongoId, metadata)).toBe(validMongoId);
  });

  it('should throw BadRequestException for invalid MongoId', () => {
    const invalidMongoId = 'invalid-id';
    expect(() => pipe.transform(invalidMongoId, metadata)).toThrow(
      BadRequestException,
    );
    expect(() => pipe.transform(invalidMongoId, metadata)).toThrow(
      'id debe ser un MongoId válido',
    );
  });

  it('should use generic "ID" in error message when metadata.data is not provided', () => {
    const invalidMongoId = 'invalid-id';
    const metadataWithoutData: ArgumentMetadata = {
      type: 'param',
      metatype: String,
    };
    expect(() => pipe.transform(invalidMongoId, metadataWithoutData)).toThrow(
      'ID debe ser un MongoId válido',
    );
  });
});
