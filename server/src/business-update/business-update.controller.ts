import { Controller, Get } from '@nestjs/common'
import { BusinessUpdateService } from './business-update.service'

@Controller('business-update')
export class BusinessUpdateController {
  constructor(private readonly businessUpdateService: BusinessUpdateService) {}

  @Get()
  async update(): Promise<{
    updatedBusinesses: number
    notUpdatedBusinesses: number
  }> {
    const updatedBusinessList = []
    const notUpdatedBusinessList = []
    try {
      const placeIDs = await this.businessUpdateService.getAllPlaceIDs()
      for (const placeID of placeIDs) {
        const business =
          await this.businessUpdateService.updateBusinessDataFromPlaces(placeID)
        business
          ? updatedBusinessList.push(business)
          : notUpdatedBusinessList.push(placeID)
      }
    } catch (error) {
      console.error('Error updating business: ' + error)
    } finally {
      return {
        updatedBusinesses: updatedBusinessList.length,
        notUpdatedBusinesses: notUpdatedBusinessList.length,
      }
    }
  }
}
