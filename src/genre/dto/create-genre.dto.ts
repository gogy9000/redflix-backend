import { IsNotEmpty, IsString } from 'class-validator'

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsString()
  slug: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  icon: string
}
