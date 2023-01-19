import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { IdInvalidationPipe } from '../pipes/IdInvalidationPipe'
import { Types } from 'mongoose'
import { User } from '../user/user-decorators/user.decorator'
import { SetRatingDto } from './dto/set-rating.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { RatingModel } from './rating.model'

@ApiTags('Ratings')
@ApiBearerAuth('JWT-auth')
@Controller('ratings')
export class RatingController {
  constructor(private readonly RatingService: RatingService) {}
  @Auth('user')
  @ApiOperation({ summary: 'get rating' })
  @ApiParam({
    name: 'movieId',
    type: String,
  })
  @ApiResponse({ schema: { type: 'number', example: 4 } })
  @Get(':movieId')
  async getMovieValueByUser(
    @Param('movieId', IdInvalidationPipe) movieId: Types.ObjectId,
    @User('_id') _id: Types.ObjectId
  ) {
    return this.RatingService.getMovieValueByUser(movieId, _id)
  }
  @UsePipes(new ValidationPipe())
  @Auth('user')
  @ApiResponse({ type: RatingModel })
  @Post('set-rating')
  async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: SetRatingDto) {
    return this.RatingService.setRating(_id, dto)
  }
}
