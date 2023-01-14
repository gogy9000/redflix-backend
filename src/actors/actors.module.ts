import { Module } from '@nestjs/common'
import { ActorsController } from './actors.controller'
import { ActorsService } from './actors.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule } from '@nestjs/config'
import { ActorModel } from './actor.model'

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ActorModel,
        schemaOptions: {
          collection: 'Actors',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class ActorsModule {}
