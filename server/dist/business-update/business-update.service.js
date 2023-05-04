"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessUpdateService = void 0;
const common_1 = require("@nestjs/common");
const business_service_1 = require("../business/business.service");
let BusinessUpdateService = class BusinessUpdateService {
    constructor(businessService) {
        this.businessService = businessService;
    }
    async getAllPlaceIDs() {
        const pipeline = [{ $match: {} }];
        try {
            const { businesses } = await this.businessService.findAll({}, pipeline);
            const businessPlaceIDList = businesses.map((business) => business.placeId.trim());
            return businessPlaceIDList;
        }
        catch (error) {
            console.error('Businesses Error: ' + error);
        }
    }
    async updateBusinessDataFromPlaces(placeID) {
        try {
            const updatedPlaceData = await this.businessService.placeDataToBusiness(placeID);
            const oldBusiness = await this.businessService.findByPlaceId(placeID);
            const mergedBusiness = this.mergeOldWithUpdate(updatedPlaceData, oldBusiness);
            const updatedBusiness = await this.businessService.updateByPlaceID(placeID, mergedBusiness);
            return updatedBusiness;
        }
        catch (error) {
            console.error('Businesses Error: ' + error);
            return null;
        }
    }
    mergeOldWithUpdate(update, old) {
        const business = {
            name: update.name,
            placeId: old.placeId,
            description: update.description ? update.description : old.description,
            logoUrl: update.logoUrl ? update.logoUrl : old.logoUrl,
            bannerUrl: update.bannerUrl ? update.bannerUrl : old.bannerUrl,
            contactInfo: {
                phone: update.contactInfo.phone
                    ? update.contactInfo.phone
                    : old.contactInfo.phone,
                email: update.contactInfo.email
                    ? update.contactInfo.email
                    : old.contactInfo.email,
                facebook: update.contactInfo.facebook
                    ? update.contactInfo.facebook
                    : old.contactInfo.facebook,
                instagram: update.contactInfo.instagram
                    ? update.contactInfo.instagram
                    : old.contactInfo.instagram,
                google: update.contactInfo.instagram
                    ? update.contactInfo.instagram
                    : old.contactInfo.instagram,
                website: update.contactInfo.website
                    ? update.contactInfo.website
                    : old.contactInfo.website,
            },
            businessStatus: update.businessStatus,
            curbsidePickup: update.curbsidePickup,
            category: update.category.length != 0 ? update.category : old.category,
            address: update.address ? update.address : old.address,
            gps: {
                lat: update.gps.lat,
                lng: update.gps.lng,
            },
            currentHours: update.currentHours
                ? update.currentHours
                : old.currentHours,
            regularHours: update.regularHours
                ? update.regularHours
                : old.regularHours,
            customHours: update.customHours ? update.customHours : old.customHours,
            byAppointmentOnly: update.byAppointmentOnly,
            displayStatus: old.displayStatus,
            override: old.override,
            createdDate: old.createdDate,
            updatedDate: new Date(Date.now()),
        };
        return business;
    }
};
BusinessUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessUpdateService);
exports.BusinessUpdateService = BusinessUpdateService;
//# sourceMappingURL=business-update.service.js.map