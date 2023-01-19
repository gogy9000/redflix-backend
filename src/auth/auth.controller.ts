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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthResDto } from './auth-dto/response-dto/auth-res.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @ApiResponse({ status: 200, type: AuthResDto })
  @ApiOperation({ summary: 'Sign in' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.AuthService.login(dto)
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, type: AuthResDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.AuthService.register(dto)
  }

  @ApiOperation({ summary: 'get access-token' })
  @ApiResponse({ status: 200, type: AuthResDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthService.getNewTokens(dto)
  }
}
