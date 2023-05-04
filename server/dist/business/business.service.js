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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const business_schema_1 = require("./schemas/business.schema");
const google_places_service_1 = require("../google-places/google-places.service");
let BusinessService = class BusinessService {
    constructor(businessModel, placesService) {
        this.businessModel = businessModel;
        this.placesService = placesService;
    }
    convertDate(date) {
        return new Date(date);
    }
    convertCurrentHours(hours) {
        const businessHours = [];
        hours.forEach((hour) => {
            const businessHour = {
                open: {
                    date: hour.open.date
                        ? this.convertDate(hour.open.date.toString())
                        : null,
                    day: hour.open.day,
                    time: hour.open.time,
                },
                close: {
                    date: hour.close.date
                        ? this.convertDate(hour.close.date.toString())
                        : null,
                    day: hour.close.day,
                    time: hour.close.time,
                },
            };
            businessHours.push(businessHour);
        });
        return businessHours;
    }
    convertTempHours(hours) {
        const businessHours = [];
        hours.forEach((hour) => {
            const businessHour = {
                date: this.convertDate(hour.date.toString()),
                open: hour.open,
                close: hour.close,
            };
            businessHours.push(businessHour);
        });
        return businessHours;
    }
    convertCurrentPeriod(periods) {
        const currentHours = [];
        const startingDate = this.convertDate(periods[0].open.date.toString());
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startingDate);
            currentDate.setDate(currentDate.getDate() + i);
            const currentHoursDay = {
                open: {
                    date: currentDate,
                    day: currentDate.getDay(),
                    time: '0000',
                },
                close: {
                    date: currentDate,
                    day: currentDate.getDay(),
                    time: '2359',
                },
            };
            currentHours.push(currentHoursDay);
        }
        return currentHours;
    }
    convertRegularPeriod() {
        const regularHours = [];
        for (let i = 0; i < 7; i++) {
            const regularHoursDay = {
                open: {
                    day: i,
                    time: '0000',
                },
                close: {
                    day: i,
                    time: '2359',
                },
            };
            regularHours.push(regularHoursDay);
        }
        return regularHours;
    }
    async create(business) {
        business.createdDate = new Date(Date.now());
        business.updatedDate = business.createdDate;
        business.currentHours = this.convertCurrentHours(business.currentHours);
        business.customHours.tempHours = business.customHours.tempHours
            ? this.convertTempHours(business.customHours.tempHours)
            : [];
        business.customHours.recurringHoursSingle = business.customHours
            .recurringHoursSingle
            ? this.convertTempHours(business.customHours.recurringHoursSingle)
            : [];
        const createdBusiness = await this.businessModel
            .create(business)
            .catch((err) => {
            console.log(err.message);
            return err.message;
        });
        return createdBusiness;
    }
    async findAll(params = {}, pipeline = []) {
        try {
            const count = await this.businessModel.countDocuments(params).exec();
            const businesses = await this.businessModel.aggregate(pipeline).exec();
            return {
                total: count,
                businesses: businesses,
            };
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async findOne(id) {
        const business = await this.businessModel.findById(id).exec();
        return business;
    }
    async findByPlaceId(placeId) {
        const business = await this.businessModel
            .findOne({ placeId: placeId })
            .exec();
        return business;
    }
    async update(id, body) {
        body.updatedDate = new Date(Date.now());
        const business = await this.businessModel
            .findByIdAndUpdate(id, { $set: body }, { overwrite: false, upsert: false, new: true })
            .exec()
            .catch((err) => {
            return err.message;
        });
        return business;
    }
    async updateByPlaceID(placeId, body) {
        const business = await this.businessModel
            .findOneAndUpdate({ placeId: placeId }, { $set: body }, { overwrite: false, upsert: false, new: true })
            .exec()
            .catch((err) => {
            return err.message;
        });
        return business;
    }
    async delete(id) {
        const deletedUser = await this.businessModel
            .findByIdAndRemove(id)
            .catch((err) => {
            return err.message;
        });
        return deletedUser;
    }
    async placeDataToBusiness(placeId) {
        const placeData = await this.placesService.getPlaceData(placeId);
        if (placeData) {
            const business = {
                name: placeData.result.name,
                placeId: placeId,
                description: placeData.result.editorial_summary
                    ? placeData.result.editorial_summary.overview
                    : null,
                logoUrl: null,
                bannerUrl: null,
                contactInfo: {
                    phone: placeData.result.formatted_phone_number
                        ? placeData.result.formatted_phone_number
                        : null,
                    email: null,
                    facebook: null,
                    instagram: null,
                    google: null,
                    website: placeData.result.website ? placeData.result.website : null,
                },
                businessStatus: placeData.result.business_status,
                curbsidePickup: placeData.result.curbside_pickup
                    ? placeData.result.curbside_pickup
                    : false,
                category: [],
                address: placeData.result.formatted_address
                    ? placeData.result.formatted_address
                    : 'Mayne Island, BC, Canada',
                gps: {
                    lat: placeData.result.geometry.location.lat,
                    lng: placeData.result.geometry.location.lng,
                },
                currentHours: placeData.result.current_opening_hours
                    ? placeData.result.current_opening_hours.periods.length != 1
                        ? placeData.result.current_opening_hours.periods
                        : this.convertCurrentPeriod(placeData.result.current_opening_hours.periods)
                    : [],
                regularHours: placeData.result.opening_hours
                    ? placeData.result.opening_hours.periods.length != 1
                        ? placeData.result.opening_hours.periods
                        : this.convertRegularPeriod()
                    : [],
                customHours: {
                    tempHours: [],
                    recurringHoursSingle: [],
                    recurringHoursInt: [],
                },
                byAppointmentOnly: false,
                displayStatus: true,
                override: false,
                createdDate: new Date(Date.now()),
                updatedDate: new Date(Date.now()),
            };
            return business;
        }
        return placeData;
    }
};
BusinessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(business_schema_1.Business.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        google_places_service_1.GooglePlacesService])
], BusinessService);
exports.BusinessService = BusinessService;
//# sourceMappingURL=business.service.js.map