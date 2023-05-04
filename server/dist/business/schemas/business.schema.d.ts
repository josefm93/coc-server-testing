/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from 'mongoose';
import { CurrentHours, RegularHours, CustomHours } from './hours.schema';
import { ContactInfo } from './contact.schema';
import { Gps } from './location.schema';
export type BusinessDocument = HydratedDocument<Business>;
export declare class Business {
    name: String;
    placeId: String;
    description: String;
    logoUrl: String;
    bannerUrl: String;
    contactInfo: ContactInfo;
    businessStatus: String;
    curbsidePickup: Boolean;
    category: String[];
    address: String;
    gps: Gps;
    currentHours: CurrentHours[];
    regularHours: RegularHours[];
    customHours: CustomHours;
    byAppointmentOnly: Boolean;
    displayStatus: Boolean;
    override: Boolean;
    createdDate: Date;
    updatedDate: Date;
}
export declare const BusinessSchema: import("mongoose").Schema<Business, import("mongoose").Model<Business, any, any, any, import("mongoose").Document<unknown, any, Business> & Omit<Business & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Business, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Business>> & Omit<import("mongoose").FlatRecord<Business> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
