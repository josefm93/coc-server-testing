import {  Injectable  } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class GooglePlacesService {
  private readonly API_KEY: string;
  readonly DETAILS_URL: string;
  readonly TEXTSEARCH_URL: string;

  constructor() {
    this.API_KEY = process.env.GOOGLE_PLACES_API_KEY;   
    this.DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/';
    this.TEXTSEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/';
  }

  async getPlaceData(placeID: string): Promise < any > {
    try {
      const response = await axios.get(`${this.DETAILS_URL}json`, {
        params: {
          place_id: placeID,
          key: this.API_KEY,
        },
      });

      if (response.status === 200 && response.data.status === 'OK') {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPlacesFromTextSearch(placeName: string): Promise < any > {
    try {
      const response = await axios.get(`${this.TEXTSEARCH_URL}json`, {
        params: {
          query: placeName,
          inputtype: 'textquery',
          key: this.API_KEY,
        },
      });

      if (response.status === 200 && response.data.status === 'OK') {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}