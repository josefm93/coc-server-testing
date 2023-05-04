import { BusinessService } from './business.service';
import { Business } from './schemas/business.schema';
export declare class BusinessController {
    private readonly businessService;
    constructor(businessService: BusinessService);
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<Business>;
    create(business: Business): Promise<Business>;
    update(id: string, business: Business): Promise<Business>;
    remove(id: string): Promise<Business>;
    placeDataToBusiness(placeId: string): Promise<Business>;
}
