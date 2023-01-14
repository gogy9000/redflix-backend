import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop, Ref } from '@typegoose/typegoose'
import { GenreModel } from '../genre/genre.model'
import { ActorModel } from '../actors/actor.model'

export class Parameters {
  @prop()
  year: number
  @prop()
  duration: number
  @prop()
  country: string
}

export interface MovieModel {}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string
  @prop()
  bigPoster: string
  @prop()
  title: string
  @prop({ unique: true })
  slug: string
  @prop()
  parameters?: Parameters
  @prop({ default: 4.0 })
  rating: string
  @prop()
  videoUrl: string
  @prop()
  countOpened: number
  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]
  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]
  @prop({ default: false })
  isSendTelegram?: boolean
}
