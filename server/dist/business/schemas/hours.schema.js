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
exports.CustomHoursSchema = exports.CustomHours = exports.TempHours = exports.RegularHoursSchema = exports.RegularHours = exports.CurrentHoursSchema = exports.CurrentHours = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CurrentHoursDay = class CurrentHoursDay {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], CurrentHoursDay.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CurrentHoursDay.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CurrentHoursDay.prototype, "time", void 0);
CurrentHoursDay = __decorate([
    (0, mongoose_1.Schema)()
], CurrentHoursDay);
const CurrentHoursDaySchema = mongoose_1.SchemaFactory.createForClass(CurrentHoursDay);
let CurrentHours = class CurrentHours {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: CurrentHoursDaySchema,
        required: true
    }),
    __metadata("design:type", CurrentHoursDay)
], CurrentHours.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: CurrentHoursDaySchema,
        required: true
    }),
    __metadata("design:type", CurrentHoursDay)
], CurrentHours.prototype, "close", void 0);
CurrentHours = __decorate([
    (0, mongoose_1.Schema)()
], CurrentHours);
exports.CurrentHours = CurrentHours;
exports.CurrentHoursSchema = mongoose_1.SchemaFactory.createForClass(CurrentHours);
let RegularHoursDay = class RegularHoursDay {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RegularHoursDay.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RegularHoursDay.prototype, "time", void 0);
RegularHoursDay = __decorate([
    (0, mongoose_1.Schema)()
], RegularHoursDay);
const RegularHoursDaySchema = mongoose_1.SchemaFactory.createForClass(RegularHoursDay);
let RegularHours = class RegularHours {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: RegularHoursDaySchema,
        required: true
    }),
    __metadata("design:type", RegularHoursDay)
], RegularHours.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: RegularHoursDaySchema,
        required: true
    }),
    __metadata("design:type", RegularHoursDay)
], RegularHours.prototype, "close", void 0);
RegularHours = __decorate([
    (0, mongoose_1.Schema)()
], RegularHours);
exports.RegularHours = RegularHours;
exports.RegularHoursSchema = mongoose_1.SchemaFactory.createForClass(RegularHours);
let TempHours = class TempHours {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TempHours.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TempHours.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TempHours.prototype, "close", void 0);
TempHours = __decorate([
    (0, mongoose_1.Schema)()
], TempHours);
exports.TempHours = TempHours;
const TempHoursSchema = mongoose_1.SchemaFactory.createForClass(TempHours);
let RecurringHoursInt = class RecurringHoursInt {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RecurringHoursInt.prototype, "week", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RecurringHoursInt.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RecurringHoursInt.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RecurringHoursInt.prototype, "close", void 0);
RecurringHoursInt = __decorate([
    (0, mongoose_1.Schema)()
], RecurringHoursInt);
const RecurringHoursIntSchema = mongoose_1.SchemaFactory.createForClass(RecurringHoursInt);
let CustomHours = class CustomHours {
};
__decorate([
    (0, mongoose_1.Prop)({ type: [TempHoursSchema] }),
    __metadata("design:type", Array)
], CustomHours.prototype, "tempHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TempHoursSchema] }),
    __metadata("design:type", Array)
], CustomHours.prototype, "recurringHoursSingle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [RecurringHoursIntSchema] }),
    __metadata("design:type", Array)
], CustomHours.prototype, "recurringHoursInt", void 0);
CustomHours = __decorate([
    (0, mongoose_1.Schema)()
], CustomHours);
exports.CustomHours = CustomHours;
exports.CustomHoursSchema = mongoose_1.SchemaFactory.createForClass(CustomHours);
//# sourceMappingURL=hours.schema.js.map