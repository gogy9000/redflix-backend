import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { MovieModel } from './movie.model'
import { Types } from 'mongoose'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { InjectModel } from 'nestjs-typegoose'
import { TelegramService } from '../telegram/telegram.service'

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
    private readonly telegramService: TelegramService
  ) {}

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm) {
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      }
    }

    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('actors genres')
      .exec()
  }
  async getBySlug(slug: string) {
    const docs = await this.MovieModel.findOne({ slug: slug })
      .populate('actors genres')
      .exec()
    if (!docs) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return docs
  }
  async byActor(actorId: Types.ObjectId) {
    const docs = await this.MovieModel.find({ actors: actorId }).exec()
    if (!docs) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return docs
  }
  async byGenres(GenresId: Types.ObjectId[]) {
    const docs = await this.MovieModel.find({
      genres: { $in: GenresId },
    }).exec()
    if (!docs) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return docs
  }
  async getMostPopular() {
    return this.MovieModel.find({ countOpened: { $gt: 0 } })
      .sort({ countOpened: -1 })
      .populate('genres')
      .exec()
  }
  async updateCountOpened(slug: string) {
    const updateDoc = await this.MovieModel.findOneAndUpdate(
      { slug },
      { $inc: { countOpened: 1 } },
      { new: true }
    ).exec()
    if (!updateDoc) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return updateDoc
  }
  async updateRating(id: Types.ObjectId, newRating: number) {
    const updateDoc = await this.MovieModel.findByIdAndUpdate(
      id,
      { rating: newRating },
      { new: true }
    ).exec()
    if (!updateDoc) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return updateDoc
  }

  async create() {
    try {
      const defaultValue: UpdateMovieDto = {
        bigPoster: '',
        actors: [],
        genres: [],
        poster: '',
        title: '',
        videoUrl: '',
        slug: '',
      }
      const doc = await this.MovieModel.create(defaultValue)
      if (!doc) {
        throw new HttpException('Что-пошло не так', HttpStatus.BAD_REQUEST)
      }
      return doc._id
    } catch (e) {
      throw new HttpException('Что-пошло не так', HttpStatus.BAD_REQUEST)
    }
  }

  async getById(_id: string) {
    const doc = await this.MovieModel.findById(_id)
    if (!doc) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return doc
  }

  async update(_id: string, dto: UpdateMovieDto) {
    if (!dto.isSendTelegram) {
      await this.sendNotification(dto)
      dto.isSendTelegram = true
    }
    console.log(dto)
    const doc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()
    if (!doc) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return doc
  }

  async delete(id: string) {
    const doc = await this.MovieModel.findByIdAndDelete(id).exec()
    if (!doc) {
      throw new HttpException('фильм не найден', HttpStatus.NOT_FOUND)
    }
    return doc
  }
  async sendNotification(dto: UpdateMovieDto) {
    // if (process.env.NODE_ENV !== 'development')
    // await this.telegramService.sendPhoto(dto.poster)
    await this.telegramService.sendPhoto(
      'https://fanart.tv/fanart/movies/245891/movieposter/john-wick-5cdaceaf4e0a7.jpg'
    )

    const msg = `<b>${dto.title}</b>`
    await this.telegramService.sendMessage(msg, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              url: 'https://okko.tv/movie/free-guy',
              text: '🍿 Go to watch',
            },
          ],
        ],
      },
    })
  }
}
