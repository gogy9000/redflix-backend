import { Types } from 'mongoose'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { ApiProperty } from '@nestjs/swagger'

export class GetRatingDto {
  @ApiProperty({
    example: '6225bdc84bc3c876b7b3bfcb',
    description: "it's id of movie",
  })
  @IsObjectId({ message: 'id not valid' })
  movieId: Types.ObjectId
}
