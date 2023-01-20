import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

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
  @IsOptional()
  poster: string
  @IsString()
  @IsOptional()
  bigPoster: string
  @IsString()
  @IsOptional()
  title: string
  @IsString()
  @IsOptional()
  slug: string
  @IsObject()
  @IsOptional()
  parameters?: Parameters
  @IsString()
  @IsOptional()
  videoUrl: string
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres: string[]
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  actors: string[]
  @IsOptional()
  @IsBoolean()
  @IsOptional()
  isSendTelegram?: boolean
}
