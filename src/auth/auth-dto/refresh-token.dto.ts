import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MDM1OTRkZGZiZTZlYzFlOGQzNzAiLCJpYXQiOjE2NzQxMTc5NzcsImV4cCI6MTY3NTQxMzk3N30.wKIQe9a4DEmRj76cbVOTFcPI9wmpCeKgwBA4t-4pq9Y',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
