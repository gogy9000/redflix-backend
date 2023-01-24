import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
  @prop()
  @ApiProperty()
  name: string
  @prop({ unique: true })
  @ApiProperty({})
  slug: string
  @prop()
  @ApiProperty({})
  description: string
  @prop()
  @ApiProperty({})
  icon: string
}
