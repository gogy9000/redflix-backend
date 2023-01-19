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
import { GenreService } from './genre.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Genres')
@ApiBearerAuth('JWT-auth')
@Controller('genres')
export class GenreController {
  constructor(private readonly GenreService: GenreService) {}

  @Auth('user')
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.GenreService.getAll(searchTerm)
  }
  @Auth('user')
  @Get('collections')
  async getCollections() {
    return this.GenreService.getCollections()
  }

  @Auth('user')
  @Delete('/:_id')
  async delete(@Param('_id', IdInvalidationPipe) _id: string) {
    return this.GenreService.deleteGenre(_id)
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Get('/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.GenreService.getBySlug(slug)
  }

  @Auth('user')
  @Get('/:_id')
  async getById(@Param('_id', IdInvalidationPipe) _id: string) {
    return await this.GenreService.getGenreById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Auth('user')
  @Put('/:_id')
  async update(
    @Body() dto: CreateGenreDto,
    @Param('_id', IdInvalidationPipe) _id: string
  ) {
    return await this.GenreService.updateGenre(_id, dto)
  }
  @Auth('user')
  @Post()
  async create() {
    return await this.GenreService.createGenre()
  }
}
