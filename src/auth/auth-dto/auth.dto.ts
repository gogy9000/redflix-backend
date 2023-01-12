import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail({}, { message: 'Это не емейл!!!' })
  email: string
  @IsString({ message: 'Пароль не сторка! А должен быть сторкой!!' })
  @MinLength(6, { message: 'Пароль маловат будет!!' })
  password: string
}
