import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, { data }: ArgumentMetadata): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(
        `${data || 'ID'} debe ser un MongoId válido`,
      );
    }
    return value;
  }
}
