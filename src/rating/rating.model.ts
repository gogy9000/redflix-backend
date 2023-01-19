import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { UserModel } from '../user/user.model'
import { MovieModel } from '../movies/movie.model'
import { ApiProperty } from '@nestjs/swagger'

export interface RatingModel extends Base {}
export class RatingModel extends TimeStamps {
  @ApiProperty({
    example: '6225bdc84bc3c876b7b3bfcb',
    description: 'userId',
  })
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>
  @ApiProperty({
    example: '6225bdc84bc3c876b7b3bfcb',
    description: 'movieId',
  })
  @prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>
  @ApiProperty({ example: 4, description: 'value Ratting' })
  @prop()
  value: number
}
