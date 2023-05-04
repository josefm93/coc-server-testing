import { Model } from 'mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { CurrentHours, TempHours, RegularHours } from './schemas/hours.schema';
import { GooglePlacesService } from 'src/google-places/google-places.service';
export declare class BusinessService {
    private readonly businessModel;
    private readonly placesService;
    constructor(businessModel: Model<BusinessDocument>, placesService: GooglePlacesService);
    convertDate(date: string): Date;
    convertCurrentHours(hours: CurrentHours[]): CurrentHours[];
    convertTempHours(hours: TempHours[]): TempHours[];
    convertCurrentPeriod(periods: any): CurrentHours[];
    convertRegularPeriod(): RegularHours[];
    create(business: Business): Promise<Business>;
    findAll(params?: {}, pipeline?: any[]): Promise<any>;
    findOne(id: string): Promise<Business>;
    findByPlaceId(placeId: string): Promise<Business>;
    update(id: string, body: any): Promise<Business>;
    updateByPlaceID(placeId: string, body: any): Promise<Business>;
    delete(id: string): Promise<Business>;
    placeDataToBusiness(placeId: string): Promise<Business>;
}
