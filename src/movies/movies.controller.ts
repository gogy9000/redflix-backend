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
import { MoviesService } from './movies.service'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { Types } from 'mongoose'
import { GenreIdsDto } from './dto/genre-id.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Movies')
@ApiBearerAuth('JWT-auth')
@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Auth('user')
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.MoviesService.getAll(searchTerm)
  }

  @Auth('user')
  @Get('/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.MoviesService.getBySlug(slug)
  }
  @Auth('user')
  @Get('by-actor/:actorId')
  async byActor(@Param('actorId', IdInvalidationPipe) actorId: Types.ObjectId) {
    return this.MoviesService.byActor(actorId)
  }

  @UsePipes(new ValidationPipe())
  @Post('by-genres')
  async byGenres(
    @Body()
    { genreIds }: GenreIdsDto
  ) {
    return this.MoviesService.byGenres(genreIds)
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.MoviesService.getMostPopular()
  }

  @Put('update-count-opened')
  async updateCountOpened(@Body('slug') slug: string) {
    return this.MoviesService.updateCountOpened(slug)
  }

  @Auth('user')
  @Get(':_id')
  async getById(@Param('_id', IdInvalidationPipe) _id: string) {
    return await this.MoviesService.getById(_id)
  }

  @Auth('user')
  @Post()
  async create() {
    return await this.MoviesService.create()
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/:_id')
  async update(
    @Body() dto: UpdateMovieDto,
    @Param('_id', IdInvalidationPipe) _id: string
  ) {
    return await this.MoviesService.update(_id, dto)
  }

  @Auth('user')
  @Delete('/:_id')
  async delete(@Param('_id', IdInvalidationPipe) _id: string) {
    return this.MoviesService.delete(_id)
  }
}
