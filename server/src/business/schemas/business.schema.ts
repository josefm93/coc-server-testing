import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import {
  CurrentHours,
  CurrentHoursSchema,
  RegularHours,
  RegularHoursSchema,
  CustomHours,
  CustomHoursSchema,
} from './hours.schema'
import { ContactInfo, ContactInfoSchema } from './contact.schema'
import { Gps, GpsSchema } from './location.schema'

export type BusinessDocument = HydratedDocument<Business>

@Schema()
export class Business {
  @Prop({ required: true })
  name: String

  @Prop()
  placeId: String

  @Prop()
  description: String

  @Prop()
  logoUrl: String

  @Prop()
  bannerUrl: String

  @Prop({
    type: ContactInfoSchema,
    required: true
  })
  contactInfo: ContactInfo
  
  @Prop({ required: true })
  businessStatus: String
  
  @Prop()
  curbsidePickup: Boolean

  @Prop()
  category: String[]

  @Prop({ required: true })
  address: String

  @Prop({ type: GpsSchema })
  gps: Gps

  @Prop({ type: [CurrentHoursSchema] })
  currentHours: CurrentHours[]

  @Prop({ type: [RegularHoursSchema] })
  regularHours: RegularHours[]

  @Prop({ type: CustomHoursSchema })
  customHours: CustomHours

  @Prop({ required: true })
  byAppointmentOnly: Boolean

  @Prop({ required: true })
  displayStatus: Boolean

  @Prop({ required: true })
  override: Boolean

  @Prop({ required: true })
  createdDate: Date

  @Prop({ required: true })
  updatedDate: Date
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
