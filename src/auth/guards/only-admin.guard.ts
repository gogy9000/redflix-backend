import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { UserModel } from '../../user/user.model'

export class OnlyAdminGuard implements CanActivate {
  // constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<{ user: UserModel }>()
    const user = req.user
    if (!user.isAdmin) {
      throw new HttpException('Ты не пройдешь!!', HttpStatus.FORBIDDEN)
    }
    return user.isAdmin
  }
}
