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
exports.BusinessSchema = exports.Business = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const hours_schema_1 = require("./hours.schema");
const contact_schema_1 = require("./contact.schema");
const location_schema_1 = require("./location.schema");
let Business = class Business {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Business.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Business.prototype, "placeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Business.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Business.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Business.prototype, "bannerUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: contact_schema_1.ContactInfoSchema,
        required: true
    }),
    __metadata("design:type", contact_schema_1.ContactInfo)
], Business.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Business.prototype, "businessStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Business.prototype, "curbsidePickup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Business.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Business.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: location_schema_1.GpsSchema }),
    __metadata("design:type", location_schema_1.Gps)
], Business.prototype, "gps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [hours_schema_1.CurrentHoursSchema] }),
    __metadata("design:type", Array)
], Business.prototype, "currentHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [hours_schema_1.RegularHoursSchema] }),
    __metadata("design:type", Array)
], Business.prototype, "regularHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: hours_schema_1.CustomHoursSchema }),
    __metadata("design:type", hours_schema_1.CustomHours)
], Business.prototype, "customHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Business.prototype, "byAppointmentOnly", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Business.prototype, "displayStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Business.prototype, "override", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Business.prototype, "createdDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Business.prototype, "updatedDate", void 0);
Business = __decorate([
    (0, mongoose_1.Schema)()
], Business);
exports.Business = Business;
exports.BusinessSchema = mongoose_1.SchemaFactory.createForClass(Business);
//# sourceMappingURL=business.schema.js.map