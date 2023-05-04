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
exports.GooglePlacesController = void 0;
const common_1 = require("@nestjs/common");
const google_places_service_1 = require("./google-places.service");
let GooglePlacesController = class GooglePlacesController {
    constructor(googlePlacesService) {
        this.googlePlacesService = googlePlacesService;
    }
    async getPlaceData(id) {
        try {
            const place = await this.googlePlacesService.getPlaceData(id);
            if (place) {
                return place;
            }
            else {
                console.log("Place not found.");
            }
        }
        catch (error) {
            console.error("Place Error: " + error);
        }
    }
    async getPlacesFromTextSearch(input) {
        try {
            const places = await this.googlePlacesService.getPlacesFromTextSearch(input);
            if (places) {
                return places;
            }
            else {
                console.log("Places not found.");
            }
        }
        catch (error) {
            console.error("Places Error: " + error);
        }
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GooglePlacesController.prototype, "getPlaceData", null);
__decorate([
    (0, common_1.Get)('search/:input'),
    __param(0, (0, common_1.Param)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GooglePlacesController.prototype, "getPlacesFromTextSearch", null);
GooglePlacesController = __decorate([
    (0, common_1.Controller)('google-places'),
    __metadata("design:paramtypes", [google_places_service_1.GooglePlacesService])
], GooglePlacesController);
exports.GooglePlacesController = GooglePlacesController;
//# sourceMappingURL=google-places.controller.js.map