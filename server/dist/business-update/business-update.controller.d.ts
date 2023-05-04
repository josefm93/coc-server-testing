import { BusinessUpdateService } from './business-update.service';
export declare class BusinessUpdateController {
    private readonly businessUpdateService;
    constructor(businessUpdateService: BusinessUpdateService);
    update(): Promise<{
        updatedBusinesses: number;
        notUpdatedBusinesses: number;
    }>;
}
