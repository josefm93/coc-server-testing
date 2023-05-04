export declare class GooglePlacesService {
    private readonly API_KEY;
    readonly DETAILS_URL: string;
    readonly TEXTSEARCH_URL: string;
    constructor();
    getPlaceData(placeID: string): Promise<any>;
    getPlacesFromTextSearch(placeName: string): Promise<any>;
}
