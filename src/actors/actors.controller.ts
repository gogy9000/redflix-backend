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
import { Auth } from '../auth/decorators/auth.decorator'
import { IdInvalidationPipe } from '../pipes/IdInvalidationPipe'
import { ActorsService } from './actors.service'
import { CreateActorsDto } from './create-actors.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Actors')
@ApiBearerAuth('JWT-auth')
@Controller('actors')
export class ActorsController {
  constructor(private readonly ActorsService: ActorsService) {}

  @Auth('user')
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.ActorsService.getAll(searchTerm)
  }

  @Auth('user')
  @Delete('/:_id')
  async delete(@Param('_id', IdInvalidationPipe) _id: string) {
    return this.ActorsService.delete(_id)
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Get('/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.ActorsService.getBySlug(slug)
  }

  @Auth('user')
  @Get('/:_id')
  async getById(@Param('_id', IdInvalidationPipe) _id: string) {
    return await this.ActorsService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/:_id')
  async update(
    @Body() dto: CreateActorsDto,
    @Param('_id', IdInvalidationPipe) _id: string
  ) {
    return await this.ActorsService.update(_id, dto)
  }
  @Auth('user')
  @Post()
  async create() {
    return await this.ActorsService.create()
  }
}
