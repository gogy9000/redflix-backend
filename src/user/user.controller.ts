import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { User } from './user-decorators/user.decorator'
import { UpdateUserDto } from './user-dto/update-user.dto'
import { IdInvalidationPipe } from '../pipes/IdInvalidationPipe'
import { Types } from 'mongoose'
import { UserModel } from './user.model'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Auth('user')
  @Get('/profile')
  async getProfile(@User('_id', IdInvalidationPipe) _id: string) {
    return await this.UserService.getUserById(_id)
  }
  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/profile')
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return await this.UserService.updateProfile(_id, dto)
  }

  @Get('profile/favorites')
  @Auth('user')
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return this.UserService.getFavoriteMovies(_id)
  }

  @Put('profile/favorites')
  @Auth('user')
  async toggleFavorite(
    @Body('movieId', IdInvalidationPipe) movieId: Types.ObjectId,
    @User() user: UserModel
  ) {
    return this.UserService.toggleFavorites(movieId, user)
  }

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
