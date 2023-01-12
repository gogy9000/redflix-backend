import { Injectable } from '@nestjs/common'
import { AuthRegisterDto } from './auth-dto/auth-register.dto'

@Injectable()
export class AuthService {
  async register(dto: AuthRegisterDto) {
    return
  }
}
