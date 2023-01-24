import { GenreModel } from '../../genre.model'
import { Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class GenreResponseDto extends GenreModel {
  @ApiProperty({ example: 'string' })
  _id: Types.ObjectId
}
