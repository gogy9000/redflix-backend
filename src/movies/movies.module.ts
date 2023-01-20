import { Module } from '@nestjs/common'
import { MoviesController } from './movies.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { MovieModel } from './movie.model'
import { MoviesService } from './movies.service'
import { TelegramModule } from '../telegram/telegram.module'

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
    TelegramModule,
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
