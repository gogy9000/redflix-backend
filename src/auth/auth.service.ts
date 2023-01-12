import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthDto } from './auth-dto/auth.dto'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from '../user/user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { CreateNewTokensDto } from './auth-dto/create-new-tokens.dto'

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async getNewTokens({ refreshToken }: CreateNewTokensDto) {
    if (!refreshToken) {
      throw new HttpException('нужен токен!', HttpStatus.BAD_REQUEST)
    }
    try {
      const result = await this.JwtService.verifyAsync(refreshToken)
      const user = await this.UserModel.findById(result._id)
      if (user) {
        const tokens = await this.issueTokenPair(String(user._id))
        return {
          user: this.returnUserFields(user),
          ...tokens,
        }
      }
    } catch (e) {
      throw new HttpException(
        'левый токен либо не актуален!',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
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
    await newUser.save()
    const tokens = await this.issueTokenPair(String(newUser._id))

    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    }
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

  async issueTokenPair(userId: string) {
    const data = { _id: userId }
    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: '15d',
    })
    const AccessToken = await this.JwtService.signAsync(data, {
      expiresIn: '1h',
    })
    return { refreshToken, AccessToken }
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }
}
