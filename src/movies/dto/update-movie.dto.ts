import { Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { GenreModel } from '../../genre/genre.model'
import { ActorModel } from '../../actors/actor.model'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class Parameters {
  @IsString()
  year: number
  @IsNumber()
  duration: number
  @IsString()
  country: string
}

export interface MovieModel {}

export class UpdateMovieDto extends TimeStamps {
  @IsString()
  poster: string
  @IsString()
  bigPoster: string
  @IsString()
  title: string
  @IsString()
  slug: string
  @IsObject()
  parameters?: Parameters
  @IsString()
  videoUrl: string
  @IsArray()
  @IsString({ each: true })
  genres: string[]
  @IsArray()
  @IsString({ each: true })
  actors: string[]
  @IsOptional()
  @IsBoolean()
  isSendTelegram?: boolean
}
