import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Это не емейл!!!' })
  email: string
  @IsOptional()
  @IsString({ message: 'Пароль не сторка! А должен быть сторкой!!' })
  @MinLength(6, { message: 'Пароль маловат будет!!' })
  password: string
  @IsOptional()
  @IsBoolean({ message: 'только тру или фалси!!' })
  isAdmin: boolean
}
