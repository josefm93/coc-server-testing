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
exports.BusinessUpdateController = void 0;
const common_1 = require("@nestjs/common");
const business_update_service_1 = require("./business-update.service");
let BusinessUpdateController = class BusinessUpdateController {
    constructor(businessUpdateService) {
        this.businessUpdateService = businessUpdateService;
    }
    async update() {
        const updatedBusinessList = [];
        const notUpdatedBusinessList = [];
        try {
            const placeIDs = await this.businessUpdateService.getAllPlaceIDs();
            for (const placeID of placeIDs) {
                const business = await this.businessUpdateService.updateBusinessDataFromPlaces(placeID);
                business
                    ? updatedBusinessList.push(business)
                    : notUpdatedBusinessList.push(placeID);
            }
        }
        catch (error) {
            console.error('Error updating business: ' + error);
        }
        finally {
            return {
                updatedBusinesses: updatedBusinessList.length,
                notUpdatedBusinesses: notUpdatedBusinessList.length,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessUpdateController.prototype, "update", null);
BusinessUpdateController = __decorate([
    (0, common_1.Controller)('business-update'),
    __metadata("design:paramtypes", [business_update_service_1.BusinessUpdateService])
], BusinessUpdateController);
exports.BusinessUpdateController = BusinessUpdateController;
//# sourceMappingURL=business-update.controller.js.map