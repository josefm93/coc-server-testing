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
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const business_service_1 = require("./business.service");
const business_schema_1 = require("./schemas/business.schema");
let BusinessController = class BusinessController {
    constructor(businessService) {
        this.businessService = businessService;
    }
    async findAll(query) {
        try {
            const { page, sort, sortBy, category, name, source, status } = query;
            const pageSize = 10;
            const skip = page ? (page - 1) * pageSize : 0;
            let params = {};
            if (category) {
                const categories = decodeURIComponent(category).split(',');
                params = Object.assign(Object.assign({}, params), { category: { $in: categories } });
            }
            if (name) {
                params = Object.assign(Object.assign({}, params), { name: { $regex: decodeURIComponent(name), $options: 'i' } });
            }
            if (source) {
                params = Object.assign(Object.assign({}, params), { override: source !== 'Google' });
            }
            if (status) {
                params = Object.assign(Object.assign({}, params), { displayStatus: status === 'Active' });
            }
            const pipeline = [];
            if (params) {
                pipeline.push({ $match: params });
            }
            if (sort && sortBy &&
                (sort === 'name' || sort === 'category' || sort === 'updatedDate')) {
                pipeline.push({ $sort: { [sort]: sortBy === 'asc' ? 1 : -1 } });
            }
            else {
                pipeline.push({ $sort: { name: 1 } });
            }
            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: pageSize });
            const businesses = await this.businessService.findAll(params, pipeline);
            if (!businesses) {
                console.log("Businesses not found");
            }
            return businesses;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async findOne(id) {
        try {
            const business = await this.businessService.findOne(id);
            if (!business) {
                console.log("Business not found");
            }
            return business;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async create(business) {
        try {
            const newBusiness = await this.businessService.create(business);
            if (!newBusiness) {
                console.log("Error creating business");
            }
            return newBusiness;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async update(id, business) {
        try {
            const updatedBusiness = await this.businessService.update(id, business);
            if (!updatedBusiness) {
                console.log("Business not found");
            }
            return updatedBusiness;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async remove(id) {
        try {
            const business = await this.businessService.delete(id);
            if (!business) {
                console.log("Business not found");
            }
            else {
                return business;
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async placeDataToBusiness(placeId) {
        try {
            const business = await this.businessService.placeDataToBusiness(placeId);
            if (!business) {
                console.log("Error creating business object from place data");
            }
            return business;
        }
        catch (err) {
            console.log(err.message);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [business_schema_1.Business]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, business_schema_1.Business]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('place/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "placeDataToBusiness", null);
BusinessController = __decorate([
    (0, common_1.Controller)('business'),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessController);
exports.BusinessController = BusinessController;
//# sourceMappingURL=business.controller.js.map