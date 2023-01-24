import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

export interface ActorModel extends Base {}
export class ActorModel extends TimeStamps {
  @prop({ unique: true })
  @ApiProperty({})
  slug: string
  @prop()
  @ApiProperty({})
  name: string
  @prop()
  @ApiProperty({})
  photo: string
}
