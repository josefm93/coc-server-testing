import { Injectable } from '@nestjs/common'
import { BusinessService } from '../business/business.service'
import { Business } from '../business/schemas/business.schema'

@Injectable()
export class BusinessUpdateService {
  constructor(private readonly businessService: BusinessService) {}

  async getAllPlaceIDs(): Promise<string[]> {
    const pipeline = [{ $match: { override: false } }]
    try {
      const { businesses } = await this.businessService.findAll({}, pipeline)
      const businessPlaceIDList = businesses.map((business) =>
        business.placeId.trim(),
      )
      return businessPlaceIDList
    } catch (error) {
      console.error('Businesses Error: ' + error)
    }
  }

  async updateBusinessDataFromPlaces(placeID: string): Promise<Business> {
    try {
      const updatedPlaceData = await this.businessService.placeDataToBusiness(
        placeID,
      )
      const oldBusiness = await this.businessService.findByPlaceId(placeID)
      const mergedBusiness = this.mergeOldWithUpdate(
        updatedPlaceData,
        oldBusiness,
      )
      const updatedBusiness = await this.businessService.updateByPlaceID(
        placeID,
        mergedBusiness,
      )
      return updatedBusiness
    } catch (error) {
      console.error('Businesses Error: ' + error)
      return null
    }
  }

  mergeOldWithUpdate(update: Business, old: Business): Business {
    const business: Business = {
      name: update.name,
      placeId: old.placeId,
      description: update.description ? update.description : old.description,
      logoUrl: update.logoUrl ? update.logoUrl : old.logoUrl,
      bannerUrl: update.bannerUrl ? update.bannerUrl : old.bannerUrl,
      contactInfo: {
        phone: update.contactInfo.phone
          ? update.contactInfo.phone
          : old.contactInfo.phone,
        email: update.contactInfo.email
          ? update.contactInfo.email
          : old.contactInfo.email,
        facebook: update.contactInfo.facebook
          ? update.contactInfo.facebook
          : old.contactInfo.facebook,
        instagram: update.contactInfo.instagram
          ? update.contactInfo.instagram
          : old.contactInfo.instagram,
        google: update.contactInfo.instagram
          ? update.contactInfo.instagram
          : old.contactInfo.instagram,
        website: update.contactInfo.website
          ? update.contactInfo.website
          : old.contactInfo.website,
      },
      businessStatus: update.businessStatus,
      curbsidePickup: update.curbsidePickup,
      category: update.category ? update.category : old.category,
      address: update.address ? update.address : old.address,
      gps: {
        lat: update.gps.lat,
        lng: update.gps.lng,
      },
      currentHours: update.currentHours
        ? update.currentHours
        : old.currentHours,
      regularHours: update.regularHours
        ? update.regularHours
        : old.regularHours,
      customHours: update.customHours ? update.customHours : old.customHours,
      byAppointmentOnly: update.byAppointmentOnly,
      displayStatus: old.displayStatus,
      override: old.override,
      createdDate: old.createdDate,
      updatedDate: new Date(Date.now()),
    }
    return business
  }
}
