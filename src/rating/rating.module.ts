import { Module } from '@nestjs/common'
import { RatingService } from './rating.service'
import { RatingController } from './rating.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { RatingModel } from './rating.model'
import { MoviesModule } from '../movies/movies.module'

@Module({
  providers: [RatingService],
  controllers: [RatingController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    MoviesModule,
  ],
})
export class RatingModule {}
