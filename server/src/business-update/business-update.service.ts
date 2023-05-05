import { Injectable } from '@nestjs/common'
import { BusinessService } from '../business/business.service'
import { Business } from '../business/schemas/business.schema'
import * as fs from 'fs'

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
      description: update.description ?? old.description,
      logoUrl: update.logoUrl ?? old.logoUrl,
      bannerUrl: update.bannerUrl ?? old.bannerUrl,
      contactInfo: {
        phone: update.contactInfo.phone ?? old.contactInfo.phone,
        email: update.contactInfo.email ?? old.contactInfo.email,
        facebook: update.contactInfo.facebook ?? old.contactInfo.facebook,
        instagram: update.contactInfo.instagram ?? old.contactInfo.instagram,
        google: update.contactInfo.instagram ?? old.contactInfo.instagram,
        website: update.contactInfo.website ?? old.contactInfo.website,
      },
      businessStatus: update.businessStatus,
      curbsidePickup: update.curbsidePickup,
      category: update.category ?? old.category,
      address: update.address ?? old.address,
      gps: {
        lat: update.gps.lat,
        lng: update.gps.lng,
      },
      currentHours: update.currentHours ?? old.currentHours,
      regularHours: update.regularHours ?? old.regularHours,
      customHours: update.customHours ?? old.customHours,
      byAppointmentOnly: update.byAppointmentOnly,
      displayStatus: old.displayStatus,
      override: old.override,
      createdDate: old.createdDate,
      updatedDate: new Date(Date.now()),
    }
    return business
  }

  readPlaceIDsFromFile(): string[] {
    try {
      const fileName = './src/business-update/business_list_ok.txt'
      const data = fs.readFileSync(fileName, 'utf8')
      const lines = data.split('\n')
      const placeIDs = []

      for (const line of lines) {
        const parts = line.split(',')
        // console.log(parts[2]);
        const id = parts[2].trim()
        placeIDs.push(id)
      }
      // console.log(placeIDs);
      return placeIDs
    } catch (error) {
      console.error('Error reading file: ' + error)
    }
  }

  async writeBusinessData(placeID: string): Promise<any> {
    try {
      const business = await this.businessService.placeDataToBusiness(placeID)
      const createdBusiness = await this.businessService.create(business)
      // console.log(createdBusiness);
      // return businesses;
    } catch (error) {
      console.error('Creating Businesses Error: ' + error)
    }
  }

  async getAllBusinesses(): Promise<void> {
    try {
      const fileName = './src/business-update/business_list_ok.txt'
      const data = fs.readFileSync(fileName, 'utf8')
      const lines = data.split('\n')
      const namesFromFile = []
      const missingNames = []
      for (const line of lines) {
        const parts = line.split(',')
        // console.log(parts[2]);
        const name = parts[1].trim()
        namesFromFile.push(name)
      }
      const businesses = await this.businessService.findAll()
      const businessList = businesses.map((business) => business.name.trim())

      for (const names of namesFromFile) {
        if (!businessList.includes(names)) {
          missingNames.push(names)
        }
      }
      console.log('business list ' + businessList.sort())
      console.log('names from file ' + namesFromFile.sort())
      console.log('missing names ' + missingNames.sort())
      // return businesses;
    } catch (error) {
      console.error('Creating Businesses Error: ' + error)
    }
  }
}
