import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthRegisterDto } from './auth-dto/auth-register.dto'

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  async register(dto: AuthRegisterDto) {
    return this.AuthService.register(dto)
  }
}
