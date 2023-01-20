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
    const req = ctx.switchToHttp().getRequest()
    const user = req.user
    return data ? user[data] : user
  }
)
