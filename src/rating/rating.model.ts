import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { UserModel } from '../user/user.model'
import { MovieModel } from '../movies/movie.model'

export interface RatingModel extends Base {}
export class RatingModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  users: Ref<UserModel>
  @prop({ ref: () => MovieModel })
  movies: Ref<MovieModel>
  @prop()
  value: number
}
