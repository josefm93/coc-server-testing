import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class ContactInfo {
  @Prop()
  phone: String

  @Prop()
  email: String

  @Prop()
  facebook: String

  @Prop()
  instagram: String

  @Prop()
  google: String

  @Prop()
  website: String
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo)
