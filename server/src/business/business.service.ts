import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Business, BusinessDocument } from './schemas/business.schema'
import { CurrentHours, TempHours, RegularHours } from './schemas/hours.schema'
import { GooglePlacesService } from 'src/google-places/google-places.service'

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name)
    private readonly businessModel: Model<BusinessDocument>,
    private readonly placesService: GooglePlacesService,
  ) {}

  convertDate(date: string): Date {
    return new Date(date)
  }

  convertCurrentHours(hours: CurrentHours[]): CurrentHours[] {
    const businessHours: CurrentHours[] = []
    hours.forEach((hour) => {
      const businessHour: CurrentHours = {
        open: {
          date: hour.open.date
            ? this.convertDate(hour.open.date.toString())
            : null,
          day: hour.open.day,
          time: hour.open.time,
        },
        close: {
          date: hour.close.date
            ? this.convertDate(hour.close.date.toString())
            : null,
          day: hour.close.day,
          time: hour.close.time,
        },
      }
      businessHours.push(businessHour)
    })
    return businessHours
  }

  convertTempHours(hours: TempHours[]): TempHours[] {
    const businessHours: TempHours[] = []
    hours.forEach((hour) => {
      const businessHour: TempHours = {
        date: this.convertDate(hour.date.toString()),
        open: hour.open,
        close: hour.close,
      }
      businessHours.push(businessHour)
    })
    return businessHours
  }

  convertCurrentPeriod(periods: any): CurrentHours[] {
    const currentHours: CurrentHours[] = []
    const startingDate = this.convertDate(periods[0].open.date.toString())
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startingDate)
      currentDate.setDate(currentDate.getDate() + i)
      const currentHoursDay: CurrentHours = {
        open: {
          date: currentDate,
          day: currentDate.getDay(),
          time: '0000',
        },
        close: {
          date: currentDate,
          day: currentDate.getDay(),
          time: '2359',
        },
      }
      currentHours.push(currentHoursDay)
    }
    return currentHours
  }

  convertRegularPeriod(): RegularHours[] {
    const regularHours: RegularHours[] = []
    for (let i = 0; i < 7; i++) {
      const regularHoursDay: RegularHours = {
        open: {
          day: i,
          time: '0000',
        },
        close: {
          day: i,
          time: '2359',
        },
      }
      regularHours.push(regularHoursDay)
    }
    return regularHours
  }

  async create(business: Business): Promise<Business> {
    business.createdDate = new Date(Date.now())
    business.updatedDate = business.createdDate
    business.currentHours = this.convertCurrentHours(business.currentHours)
    business.customHours.tempHours = business.customHours.tempHours
      ? this.convertTempHours(business.customHours.tempHours)
      : []
    business.customHours.recurringHoursSingle = business.customHours
      .recurringHoursSingle
      ? this.convertTempHours(business.customHours.recurringHoursSingle)
      : []

    const createdBusiness = await this.businessModel
      .create(business)
      .catch((err) => {
        console.log(err.message)
        return err.message
      })
    return createdBusiness
  }

  async findAll(params = {}, pipeline = []): Promise<any> {
    try {
      const count = await this.businessModel.countDocuments(params).exec()
      const businesses = await this.businessModel.aggregate(pipeline).exec()
      return {
        total: count,
        businesses: businesses,
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.businessModel.findById(id).exec()
    return business
  }

  async findByPlaceId(placeId: string): Promise<Business> {
    const business = await this.businessModel
      .findOne({ placeId: placeId })
      .exec()
    return business
  }

  async update(id: string, body: any): Promise<Business> {
    body.updatedDate = new Date(Date.now())
    const business = await this.businessModel
      .findByIdAndUpdate(
        id,
        { $set: body },
        { overwrite: false, upsert: false, new: true },
      )
      .exec()
      .catch((err) => {
        return err.message
      })
    return business
  }

  async updateByPlaceID(placeId: string, body: any): Promise<Business> {
    const business = await this.businessModel
      .findOneAndUpdate(
        { placeId: placeId },
        { $set: body },
        { overwrite: false, upsert: false, new: true },
      )
      .exec()
      .catch((err) => {
        return err.message
      })
    return business
  }

  async delete(id: string): Promise<Business> {
    const deletedUser = await this.businessModel
      .findByIdAndRemove(id)
      .catch((err) => {
        return err.message
      })
    return deletedUser
  }

  async placeDataToBusiness(placeId: string): Promise<Business> {
    const placeData = await this.placesService.getPlaceData(placeId)
    if (placeData) {
      const business: Business = {
        name: placeData.result.name,
        placeId: placeId,
        description: placeData.result.editorial_summary
          ? placeData.result.editorial_summary.overview
          : null,
        logoUrl: null,
        bannerUrl: null,
        contactInfo: {
          phone: placeData.result.formatted_phone_number
            ? placeData.result.formatted_phone_number
            : null,
          email: null,
          facebook: null,
          instagram: null,
          google: null,
          website: placeData.result.website ? placeData.result.website : null,
        },
        businessStatus: placeData.result.business_status,
        curbsidePickup: placeData.result.curbside_pickup
          ? placeData.result.curbside_pickup
          : false,
        category: [],
        address: placeData.result.formatted_address
          ? placeData.result.formatted_address
          : 'Mayne Island, BC, Canada',
        gps: {
          lat: placeData.result.geometry.location.lat,
          lng: placeData.result.geometry.location.lng,
        },
        currentHours: placeData.result.current_opening_hours
          ? placeData.result.current_opening_hours.periods.length != 1
            ? placeData.result.current_opening_hours.periods
            : this.convertCurrentPeriod(
                placeData.result.current_opening_hours.periods,
              )
          : [],
        regularHours: placeData.result.opening_hours
          ? placeData.result.opening_hours.periods.length != 1
            ? placeData.result.opening_hours.periods
            : this.convertRegularPeriod()
          : [],
        customHours: {
          tempHours: [],
          recurringHoursSingle: [],
          recurringHoursInt: [],
        },
        byAppointmentOnly: false,
        displayStatus: true,
        override: false,
        createdDate: new Date(Date.now()),
        updatedDate: new Date(Date.now()),
      }
      return business
    }
    return placeData
  }
}
