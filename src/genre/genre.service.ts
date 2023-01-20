import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { GenreModel } from './genre.model'
import { CreateGenreDto } from './dto/create-genre.dto'
import { MoviesService } from '../movies/movies.service'
import { ICollection } from './genre.interface'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
    private readonly MovieService: MoviesService
  ) {}
  async createGenre() {
    try {
      const defaultValue: CreateGenreDto = {
        name: '',
        description: '',
        slug: '',
        icon: '',
      }
      const genre = await this.GenreModel.create(defaultValue)
      return genre._id
    } catch (e) {
      throw new HttpException('Что-пошло не так', HttpStatus.BAD_REQUEST)
    }
  }

  async getBySlug(slug: string) {
    const genre = await this.GenreModel.findOne({ slug: slug })
    if (!genre) {
      throw new HttpException('жанр не найден', HttpStatus.NOT_FOUND)
    }
    return genre
  }

  async getGenreById(_id: string) {
    const genre = await this.GenreModel.findById(_id)
    if (!genre) {
      throw new HttpException('жанр не найден', HttpStatus.NOT_FOUND)
    }
    return genre
  }

  async updateGenre(_id: string, dto: CreateGenreDto) {
    const genre = await this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()
    if (!genre) {
      throw new HttpException('жанр не найден', HttpStatus.NOT_FOUND)
    }
    return genre
  }

  async deleteGenre(id: string) {
    const res = await this.GenreModel.findByIdAndDelete(id).exec()
    if (!res) {
      throw new HttpException('жанр не найден', HttpStatus.NOT_FOUND)
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
          { description: new RegExp(searchTerm, 'i') },
        ],
      }
    }
    return this.GenreModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec()
  }

  async getCollections() {
    const genres = await this.getAll()
    return Promise.all(
      genres.map(async (genre) => {
        const movieByGenre = await this.MovieService.byGenres([genre._id])
        const result: ICollection = {
          _id: String(genre._id),
          image: movieByGenre[0].bigPoster,
          slug: genre.slug,
          title: genre.name,
        }
        return result
      })
    )
  }
}
