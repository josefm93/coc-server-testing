import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
@Schema()
export class Gps {
  @Prop({ required: true })
  lat: Number

  @Prop({ required: true })
  lng: Number
}

export const GpsSchema = SchemaFactory.createForClass(Gps)