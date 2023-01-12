import { IsNotEmpty, IsString } from 'class-validator'

export class CreateNewTokensDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
