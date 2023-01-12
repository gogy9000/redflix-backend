import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { UserModel } from '../user.model'
type TypeData = keyof UserModel
export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    try {
      const req = ctx.switchToHttp().getRequest()
      const user = req.user
      return data ? { [data]: user[data] } : { ...user }
    } catch (e) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
    }
  }
)
