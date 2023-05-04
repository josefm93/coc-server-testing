import { GooglePlacesService } from './google-places.service';
export declare class GooglePlacesController {
    private readonly googlePlacesService;
    constructor(googlePlacesService: GooglePlacesService);
    getPlaceData(id: string): Promise<any>;
    getPlacesFromTextSearch(input: string): Promise<any>;
}
