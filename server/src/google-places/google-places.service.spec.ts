import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlacesService } from './google-places.service';

describe('GooglePlacesService', () => {
  let service: GooglePlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglePlacesService],
    }).compile();

    service = module.get<GooglePlacesService>(GooglePlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getPlaceData', () => {
    it('should return place data for valid place ID', async () => {
      const placeID = 'ChIJ_x3jZEX2hVQRKu9v4K1tWwQ';
      const placeData = await service.getPlaceData(placeID);
      expect(placeData).toBeDefined();
      expect(placeData.result).toBeDefined();
      expect(placeData.result.place_id).toEqual(placeID);
    });

    it('should return null for invalid place ID', async () => {
      const placeID = 'some-invalid-place-id';
      const placeData = await service.getPlaceData(placeID);
      expect(placeData).toBeNull();
    });
  });

  describe('getPlacesFromTextSearch', () => {
    it('should return places for valid search query', async () => {
      const placeName = 'Georgina Point';
      const places = await service.getPlacesFromTextSearch(placeName);
      expect(places).toBeDefined();
      expect(places.results).toBeDefined();
      expect(places.results.length).toBeGreaterThan(0);
    });

    it('should return null for invalid search query', async () => {
      const placeName = 'qwepoqiweqwe';
      const places = await service.getPlacesFromTextSearch(placeName);
      expect(places).toBeNull();
    });
  });
});
