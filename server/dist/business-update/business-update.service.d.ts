import { BusinessService } from '../business/business.service';
import { Business } from '../business/schemas/business.schema';
export declare class BusinessUpdateService {
    private readonly businessService;
    constructor(businessService: BusinessService);
    getAllPlaceIDs(): Promise<string[]>;
    updateBusinessDataFromPlaces(placeID: string): Promise<Business>;
    mergeOldWithUpdate(update: Business, old: Business): Business;
    readPlaceIDsFromFile(): string[];
    writeBusinessData(placeID: string): Promise<any>;
    getAllBusinesses(): Promise<void>;
}
