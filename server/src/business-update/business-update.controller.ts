import { Controller, Get, Param } from '@nestjs/common'
import { BusinessUpdateService } from './business-update.service'

@Controller('business-update')
export class BusinessUpdateController {
  constructor(private readonly businessUpdateService: BusinessUpdateService) {}

  @Get('/write-from-file/')
  async getHello(): Promise<void> {
    try {
      const placeIDs = this.businessUpdateService.readPlaceIDsFromFile()
      for (const placeID of placeIDs) {
        await this.businessUpdateService.writeBusinessData(placeID)
      }
    } catch (error) {
      console.error('Error reading file: ' + error)
    }
  }

  @Get('/write/:id')
  async write(@Param('id') placeID: string): Promise<void> {
    try {
      await this.businessUpdateService.writeBusinessData(placeID)
    } catch (error) {
      console.error('Error writing business: ' + error)
    }
  }

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
