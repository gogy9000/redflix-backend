import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { MovieModel } from '../movies/movie.model'
import { ApiProperty } from '@nestjs/swagger'
export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @prop({ unique: true })
  email: string
  @ApiProperty({ example: 'qwerty', description: 'password' })
  @prop()
  password: string
  @ApiProperty({ example: 'true', description: 'is admin' })
  @prop({ default: false })
  isAdmin?: boolean
  @prop({ default: [], ref: () => MovieModel })
  favorites?: Ref<MovieModel>[]
}
