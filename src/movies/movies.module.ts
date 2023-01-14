import { Module } from '@nestjs/common'
import { MoviesController } from './movies.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { MovieModel } from './movie.model'
import { MoviesService } from './movies.service'

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class MoviesModule {}
