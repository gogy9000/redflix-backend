import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { GenreModel } from '../genre/genre.model'
import { ActorModel } from '../actors/actor.model'
import { ApiProperty, ApiResponse } from '@nestjs/swagger'
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
  ApiResponseModelProperty,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { GenreResponseDto } from '../genre/dto/response.dto/genre-response.dto'

export class Parameters {
  @prop()
  @ApiProperty({})
  year: number
  @prop()
  @ApiProperty({})
  duration: number
  @prop()
  @ApiProperty({})
  country: string
}

export interface MovieModel {}

export class MovieModel extends TimeStamps {
  @ApiProperty({})
  @prop()
  poster: string
  @ApiProperty({})
  @prop()
  bigPoster: string
  @ApiProperty({})
  @prop()
  title: string
  @ApiProperty({})
  @prop({ unique: true })
  slug: string
  @ApiProperty({})
  @prop()
  parameters?: Parameters
  @ApiProperty({})
  @prop({ default: 4.0 })
  rating: string
  @ApiProperty({})
  @prop()
  videoUrl: string
  @ApiProperty({})
  @prop()
  countOpened: number

  @ApiProperty({ example: { _id: 'string', name: 'string' } })
  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]
  @ApiProperty()
  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]
  @ApiProperty()
  @prop({ default: false })
  isSendTelegram?: boolean
}
