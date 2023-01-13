import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { GetUserByIdDto } from './user-dto/get-user-by-id.dto'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from './user-decorators/user.decorator'
import { UpdateUserDto } from './user-dto/update-user.dto'
import { IdInvalidationPipe } from '../pipes/IdInvalidationPipe'

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Auth('user')
  @Get()
  async getAllUsers(@Query('searchTerm') searchTerm?: string) {
    return this.UserService.getAll(searchTerm)
  }
  @Auth('user')
  @Get('count')
  async getCount() {
    return this.UserService.getCount()
  }

  @Auth('user')
  @Delete('/:_id')
  async deleteUserById(@Param('_id', IdInvalidationPipe) _id: string) {
    return this.UserService.deleteUser(_id)
  }

  @Auth('user')
  @Get('/profile')
  async getProfile(@User('_id', IdInvalidationPipe) _id: string) {
    return await this.UserService.getUserById(_id)
  }
  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/profile')
  async updateProfile(
    @User('_id', IdInvalidationPipe) _id: string,
    @Body() dto: UpdateUserDto
  ) {
    return await this.UserService.updateProfile(_id, dto)
  }

  @Auth('user')
  @Get('/:_id')
  async getById(@Param('_id', IdInvalidationPipe) _id: string) {
    return await this.UserService.getUserById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/:_id')
  async updateUserProfile(
    @Body() dto: UpdateUserDto,
    @Param('_id', IdInvalidationPipe) _id: string
  ) {
    return await this.UserService.updateProfile(_id, dto)
  }
}
