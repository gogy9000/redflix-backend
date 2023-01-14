import { IsNotEmpty, IsString } from 'class-validator'

export class CreateActorsDto {
  @IsNotEmpty()
  @IsString()
  slug: string
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsString()
  photo: string
}
