import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthDto } from './auth-dto/auth.dto'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from '../user/user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash, compare } from 'bcryptjs'
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}
  async login(dto: AuthDto) {
    return await this.validateUser(dto)
  }

  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email })
    if (oldUser) {
      throw new HttpException(
        'Пользователь с такой почтой уже имеется, придумай другую',
        HttpStatus.BAD_REQUEST
      )
    }
    const salt = await genSalt(10)
    const newUser = new this.UserModel({
      email: dto.email,
      password: await hash(dto.password, salt),
    })
    return newUser.save()
  }
  async validateUser(dto: AuthDto) {
    const user = await this.UserModel.findOne({ email: dto.email })
    if (!user) {
      throw new HttpException(
        'Пользователя с такой почтой нет в базе данных!!',
        HttpStatus.NOT_FOUND
      )
    }
    const isValidPassword = await compare(dto.password, user.password)
    if (!isValidPassword) {
      throw new HttpException('Не угадал пароль!!', HttpStatus.BAD_REQUEST)
    }
    return user
  }
}
