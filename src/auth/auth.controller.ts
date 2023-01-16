import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth-dto/auth.dto'
import { RefreshTokenDto } from './auth-dto/refresh-token.dto'
import { Auth } from './decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.AuthService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const res = await this.AuthService.register(dto)
    return res
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthService.getNewTokens(dto)
  }
}
