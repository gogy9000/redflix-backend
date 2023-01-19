import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { RatingModel } from './rating.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { MoviesService } from '../movies/movies.service'
import { Types } from 'mongoose'
import { SetRatingDto } from './dto/set-rating.dto'

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly RatingModel: ModelType<RatingModel>,
    private readonly MovieService: MoviesService
  ) {}

  async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return this.RatingModel.findOne({ movieId, userId })
      .select('value')
      .exec()
      .then((data) => (data ? data.value : 0))
  }

  async averageRatingByMovie(movieId: Types.ObjectId | string) {
    const averageRating: RatingModel[] = await this.RatingModel.aggregate()
      .match({
        movieId: new Types.ObjectId(movieId),
      })
      .exec()
    return (
      averageRating.reduce((acc, curr) => acc + curr.value, 0) /
      averageRating.length
    )
  }
  async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
    const { value, movieId } = dto

    const newRating = await this.RatingModel.findOneAndUpdate(
      { movies: movieId, users: userId },
      {
        movies: movieId,
        users: userId,
        value,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).exec()

    const averageRating = await this.averageRatingByMovie(movieId)

    await this.MovieService.updateRating(movieId, averageRating)

    return newRating
  }
}
