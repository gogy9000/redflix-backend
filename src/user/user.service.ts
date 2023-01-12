import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from './user.model'
import { GetUserByIdDto } from './user-dto/get-user-by-id.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
  ) {}

  async getUserById({ _id }: GetUserByIdDto) {
    try {
      const user = await this.UserModel.findById(_id)
      return user
    } catch (e) {
      throw new HttpException('пользователь не найден', HttpStatus.NOT_FOUND)
    }
  }
}
