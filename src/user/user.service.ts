import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from './user.model'
import { GetUserByIdDto } from './user-dto/get-user-by-id.dto'
import { UpdateUserDto } from './user-dto/update-user.dto'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { use } from 'passport'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async getUserById(_id: GetUserByIdDto['_id']) {
    try {
      return await this.UserModel.findById(_id)
    } catch (e) {
      throw new HttpException('пользователь не найден', HttpStatus.NOT_FOUND)
    }
  }

  async updateProfile(_id: GetUserByIdDto['_id'], dto: UpdateUserDto) {
    const user = await this.getUserById(_id)
    if (user) {
      const foundUserByEmail = await this.UserModel.findOne({
        email: dto.email,
      })
      if (
        foundUserByEmail &&
        String(user._id) !== String(foundUserByEmail._id)
      ) {
        throw new HttpException('почта уже занята', HttpStatus.CONFLICT)
      }
      if (dto.password) {
        const salt = await genSalt(10)
        user.password = await hash(dto.password, salt)
      }
      if (dto.email) {
        user.email = dto.email
      }
      if (dto.isAdmin) {
        if (user.isAdmin) {
          user.isAdmin = dto.isAdmin
        } else {
          throw new HttpException(
            'isAdmin опция только для админа',
            HttpStatus.FORBIDDEN
          )
        }
      }
      return await user.save()
    }
  }

  async getCount() {
    return this.UserModel.find().count().exec()
  }

  async deleteUser(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec()
  }

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm) {
      options = {
        $or: [{ email: new RegExp(searchTerm, 'i') }],
      }
    }
    return this.UserModel.find(options)
      .select('-password -updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec()
  }

  async toggleFavorites(movieId: Types.ObjectId, user: UserModel) {
    const { _id, favorites } = user

    const doc = await this.UserModel.findByIdAndUpdate(
      _id,
      {
        favorites: favorites?.includes(movieId)
          ? favorites.filter((id) => String(id) !== String(movieId))
          : [movieId, favorites && favorites],
      },
      { new: true }
    ).exec()

    if (!doc) {
      throw new HttpException(
        { for_users: 'нет такого фильма!', for_devs: doc },
        HttpStatus.NOT_FOUND
      )
    }
    return doc
  }

  async getFavoriteMovies(_id: Types.ObjectId) {
    const docs = await this.UserModel.findById(_id, 'favorites')
      .populate({
        path: 'favorites',
        populate: {
          path: 'genres',
        },
      })
      .exec()
      .then((data) => data?.favorites)
    if (!docs) {
      throw new HttpException(
        { for_users: 'нет такого фильма!', for_devs: docs },
        HttpStatus.NOT_FOUND
      )
    }
    return docs
  }
}
