import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class CurrentHoursDay {
  @Prop({ required: true })
  date: Date

  @Prop({ required: true })
  day: Number

  @Prop({ required: true })
  time: String
}
const CurrentHoursDaySchema = SchemaFactory.createForClass(CurrentHoursDay)

@Schema()
export class CurrentHours {
  @Prop({
    type: CurrentHoursDaySchema,
    required: true
  })
  open: CurrentHoursDay

  @Prop({
    type: CurrentHoursDaySchema,
    required: true
  })
  close: CurrentHoursDay
}
export const CurrentHoursSchema = SchemaFactory.createForClass(CurrentHours)


@Schema()
class RegularHoursDay {
  @Prop({ required: true })
  day: Number

  @Prop({ required: true })
  time: String
}
const RegularHoursDaySchema = SchemaFactory.createForClass(RegularHoursDay)

@Schema()
export class RegularHours {
  @Prop({
    type: RegularHoursDaySchema,
    required: true
  })
  open: RegularHoursDay

  @Prop({
    type: RegularHoursDaySchema,
    required: true
  })
  close: RegularHoursDay
}
export const RegularHoursSchema = SchemaFactory.createForClass(RegularHours)


@Schema()
export class TempHours {
  @Prop({ required: true })
  date: Date

  @Prop()
  open: String

  @Prop()
  close: String
}
const TempHoursSchema = SchemaFactory.createForClass(TempHours)

@Schema()
class RecurringHoursInt {
  @Prop({ required: true })
  week: Number

  @Prop({ required: true })
  day: Number

  @Prop()
  open: String

  @Prop()
  close: String
}
const RecurringHoursIntSchema = SchemaFactory.createForClass(RecurringHoursInt)

@Schema()
export class CustomHours {
  @Prop({ type: [TempHoursSchema] })
  tempHours: TempHours[]

  @Prop({ type: [TempHoursSchema]})
  recurringHoursSingle: TempHours[]
  
  @Prop({ type: [RecurringHoursIntSchema] })
  recurringHoursInt: RecurringHoursInt[]
}
export const CustomHoursSchema = SchemaFactory.createForClass(CustomHours)
