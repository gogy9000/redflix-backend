import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateGenreDto } from '../genre/dto/create-genre.dto'
import { ActorModel } from './actor.model'
import { CreateActorsDto } from './create-actors.dto'

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
  ) {}
  async create() {
    try {
      const defaultValue: CreateActorsDto = {
        name: '',
        slug: '',
        photo: '',
      }
      const actor = await this.ActorModel.create(defaultValue)
      return actor._id
    } catch (e) {
      throw new HttpException('Что-пошло не так', HttpStatus.BAD_REQUEST)
    }
  }

  async getBySlug(slug: string) {
    const actor = await this.ActorModel.findOne({ slug: slug })
    if (!actor) {
      throw new HttpException('актер не найден', HttpStatus.NOT_FOUND)
    }
    return actor
  }

  async getById(_id: string) {
    const actor = await this.ActorModel.findById(_id)
    if (!actor) {
      throw new HttpException('актер не найден', HttpStatus.NOT_FOUND)
    }
    return actor
  }

  async update(_id: string, dto: CreateActorsDto) {
    const actor = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()
    if (!actor) {
      throw new HttpException('актер не найден', HttpStatus.NOT_FOUND)
    }
    return actor
  }

  async delete(id: string) {
    const res = await this.ActorModel.findByIdAndDelete(id).exec()
    if (!res) {
      throw new HttpException('актер не найден', HttpStatus.NOT_FOUND)
    }
    return res
  }

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm) {
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
        ],
      }
    }
    const docs = await this.ActorModel.aggregate()
      .match(options)
      .lookup({
        from: 'Movie',
        localField: '_id',
        foreignField: 'actors',
        as: 'movies',
      })
      .addFields({
        countMovies: {
          $size: '$movies',
        },
      })
      .project({ __v: 0, updatedAt: 0, movies: 0 })
      .sort({
        createdAt: -1,
      })
      .exec()
    if (!docs) {
      throw new HttpException('совпадений нет!', HttpStatus.NOT_FOUND)
    }
    return docs
  }
}
