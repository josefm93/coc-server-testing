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
exports.GooglePlacesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
let GooglePlacesService = class GooglePlacesService {
    constructor() {
        this.API_KEY = process.env.GOOGLE_PLACES_API_KEY;
        this.DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/';
        this.TEXTSEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/';
    }
    async getPlaceData(placeID) {
        try {
            const response = await axios_1.default.get(`${this.DETAILS_URL}json`, {
                params: {
                    place_id: placeID,
                    key: this.API_KEY,
                },
            });
            if (response.status === 200 && response.data.status === 'OK') {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async getPlacesFromTextSearch(placeName) {
        try {
            const response = await axios_1.default.get(`${this.TEXTSEARCH_URL}json`, {
                params: {
                    query: placeName,
                    inputtype: 'textquery',
                    key: this.API_KEY,
                },
            });
            if (response.status === 200 && response.data.status === 'OK') {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};
GooglePlacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GooglePlacesService);
exports.GooglePlacesService = GooglePlacesService;
//# sourceMappingURL=google-places.service.js.map