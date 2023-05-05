import { BusinessUpdateService } from './business-update.service';
export declare class BusinessUpdateController {
    private readonly businessUpdateService;
    constructor(businessUpdateService: BusinessUpdateService);
    getHello(): Promise<void>;
    write(placeID: string): Promise<void>;
    update(): Promise<{
        updatedBusinesses: number;
        notUpdatedBusinesses: number;
    }>;
}
