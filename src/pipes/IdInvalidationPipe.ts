import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'
export class IdInvalidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'param') {
      return value
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new HttpException(
        `не валидный id: ${value}`,
        HttpStatus.BAD_REQUEST
      )
    }
    return value
  }
}
