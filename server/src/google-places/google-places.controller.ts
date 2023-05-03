import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import {
  GooglePlacesService
} from './google-places.service';

@Controller('google-places')
export class GooglePlacesController {
  constructor(private readonly googlePlacesService: GooglePlacesService) {}

  @Get(':id')
  async getPlaceData(@Param('id') id: string): Promise<any> {
    try {
      const place = await this.googlePlacesService.getPlaceData(id);
      if (place) {  
        // console.log(place);
        return place;
      } else {
        console.log("Place not found.");
      }
      
    } catch (error) {
      console.error("Place Error: " + error);
    }
  }

  @Get('search/:input')
  async getPlacesFromTextSearch(@Param('input') input: string): Promise<any> {
    try {
      const places = await this.googlePlacesService.getPlacesFromTextSearch(input);
      if (places) {  
        return places;
      } else {
        console.log("Places not found.");
      }
    } catch (error) {
      console.error("Places Error: " + error);
    }
  }
}