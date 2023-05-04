"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessUpdateModule = void 0;
const common_1 = require("@nestjs/common");
const business_update_controller_1 = require("./business-update.controller");
const business_update_service_1 = require("./business-update.service");
const business_module_1 = require("../business/business.module");
const google_places_module_1 = require("../google-places/google-places.module");
let BusinessUpdateModule = class BusinessUpdateModule {
};
BusinessUpdateModule = __decorate([
    (0, common_1.Module)({
        imports: [business_module_1.BusinessModule, google_places_module_1.GooglePlacesModule],
        controllers: [business_update_controller_1.BusinessUpdateController],
        providers: [business_update_service_1.BusinessUpdateService],
    })
], BusinessUpdateModule);
exports.BusinessUpdateModule = BusinessUpdateModule;
//# sourceMappingURL=business-update.module.js.map