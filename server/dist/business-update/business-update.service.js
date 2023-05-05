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
const fs = require("fs");
let BusinessUpdateService = class BusinessUpdateService {
    constructor(businessService) {
        this.businessService = businessService;
    }
    async getAllPlaceIDs() {
        const pipeline = [{ $match: { override: false } }];
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const business = {
            name: update.name,
            placeId: old.placeId,
            description: (_a = update.description) !== null && _a !== void 0 ? _a : old.description,
            logoUrl: (_b = update.logoUrl) !== null && _b !== void 0 ? _b : old.logoUrl,
            bannerUrl: (_c = update.bannerUrl) !== null && _c !== void 0 ? _c : old.bannerUrl,
            contactInfo: {
                phone: (_d = update.contactInfo.phone) !== null && _d !== void 0 ? _d : old.contactInfo.phone,
                email: (_e = update.contactInfo.email) !== null && _e !== void 0 ? _e : old.contactInfo.email,
                facebook: (_f = update.contactInfo.facebook) !== null && _f !== void 0 ? _f : old.contactInfo.facebook,
                instagram: (_g = update.contactInfo.instagram) !== null && _g !== void 0 ? _g : old.contactInfo.instagram,
                google: (_h = update.contactInfo.instagram) !== null && _h !== void 0 ? _h : old.contactInfo.instagram,
                website: (_j = update.contactInfo.website) !== null && _j !== void 0 ? _j : old.contactInfo.website,
            },
            businessStatus: update.businessStatus,
            curbsidePickup: update.curbsidePickup,
            category: (_k = update.category) !== null && _k !== void 0 ? _k : old.category,
            address: (_l = update.address) !== null && _l !== void 0 ? _l : old.address,
            gps: {
                lat: update.gps.lat,
                lng: update.gps.lng,
            },
            currentHours: (_m = update.currentHours) !== null && _m !== void 0 ? _m : old.currentHours,
            regularHours: (_o = update.regularHours) !== null && _o !== void 0 ? _o : old.regularHours,
            customHours: (_p = update.customHours) !== null && _p !== void 0 ? _p : old.customHours,
            byAppointmentOnly: update.byAppointmentOnly,
            displayStatus: old.displayStatus,
            override: old.override,
            createdDate: old.createdDate,
            updatedDate: new Date(Date.now()),
        };
        return business;
    }
    readPlaceIDsFromFile() {
        try {
            const fileName = './src/business-update/business_list_ok.txt';
            const data = fs.readFileSync(fileName, 'utf8');
            const lines = data.split('\n');
            const placeIDs = [];
            for (const line of lines) {
                const parts = line.split(',');
                const id = parts[2].trim();
                placeIDs.push(id);
            }
            return placeIDs;
        }
        catch (error) {
            console.error('Error reading file: ' + error);
        }
    }
    async writeBusinessData(placeID) {
        try {
            const business = await this.businessService.placeDataToBusiness(placeID);
            const createdBusiness = await this.businessService.create(business);
        }
        catch (error) {
            console.error('Creating Businesses Error: ' + error);
        }
    }
    async getAllBusinesses() {
        try {
            const fileName = './src/business-update/business_list_ok.txt';
            const data = fs.readFileSync(fileName, 'utf8');
            const lines = data.split('\n');
            const namesFromFile = [];
            const missingNames = [];
            for (const line of lines) {
                const parts = line.split(',');
                const name = parts[1].trim();
                namesFromFile.push(name);
            }
            const businesses = await this.businessService.findAll();
            const businessList = businesses.map((business) => business.name.trim());
            for (const names of namesFromFile) {
                if (!businessList.includes(names)) {
                    missingNames.push(names);
                }
            }
            console.log('business list ' + businessList.sort());
            console.log('names from file ' + namesFromFile.sort());
            console.log('missing names ' + missingNames.sort());
        }
        catch (error) {
            console.error('Creating Businesses Error: ' + error);
        }
    }
};
BusinessUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessUpdateService);
exports.BusinessUpdateService = BusinessUpdateService;
//# sourceMappingURL=business-update.service.js.map