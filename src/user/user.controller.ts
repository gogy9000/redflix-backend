import { Controller, Get, Param, Query } from '@nestjs/common'
import { GetUserByIdDto } from './user-dto/get-user-by-id.dto'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from './user-decorators/user.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Auth('user')
  @Get('/profile')
  async profile(@User('_id') _id: string) {
    return await this.UserService.getUserById({ _id })
  }
  @Auth('user')
  @Get('/:_id')
  async getById(@Param() dto: GetUserByIdDto) {
    return await this.UserService.getUserById(dto)
  }
}
