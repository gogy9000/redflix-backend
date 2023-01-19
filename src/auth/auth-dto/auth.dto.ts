import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsEmail({}, { message: 'Это не емейл!!!' })
  email: string

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsString({ message: 'Пароль не сторка! А должен быть сторкой!!' })
  @MinLength(6, { message: 'Пароль маловат будет!!' })
  password: string
}
