import { ApiProperty } from '@nestjs/swagger'

export class AuthResDto {
  @ApiProperty({
    example: {
      _id: '63c903594ddfbe6ec1e8d370',
      email: 'example@gmail.com',
      isAdmin: false,
    },
  })
  user: {
    _id: string
    email: string
    isAdmin: boolean
  }
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MDM1OTRkZGZiZTZlYzFlOGQzNzAiLCJpYXQiOjE2NzQxMTc5NzcsImV4cCI6MTY3NTQxMzk3N30.wKIQe9a4DEmRj76cbVOTFcPI9wmpCeKgwBA4t-4pq9Y',
  })
  accessToken: string
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MDM1OTRkZGZiZTZlYzFlOGQzNzAiLCJpYXQiOjE2NzQxMTc5NzcsImV4cCI6MTY3NTQxMzk3N30.wKIQe9a4DEmRj76cbVOTFcPI9wmpCeKgwBA4t-4pq9Y',
  })
  refreshToken: string
}
