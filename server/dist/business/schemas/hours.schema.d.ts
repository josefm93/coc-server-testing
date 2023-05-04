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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
declare class CurrentHoursDay {
    date: Date;
    day: Number;
    time: String;
}
export declare class CurrentHours {
    open: CurrentHoursDay;
    close: CurrentHoursDay;
}
export declare const CurrentHoursSchema: import("mongoose").Schema<CurrentHours, import("mongoose").Model<CurrentHours, any, any, any, import("mongoose").Document<unknown, any, CurrentHours> & Omit<CurrentHours & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CurrentHours, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CurrentHours>> & Omit<import("mongoose").FlatRecord<CurrentHours> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
declare class RegularHoursDay {
    day: Number;
    time: String;
}
export declare class RegularHours {
    open: RegularHoursDay;
    close: RegularHoursDay;
}
export declare const RegularHoursSchema: import("mongoose").Schema<RegularHours, import("mongoose").Model<RegularHours, any, any, any, import("mongoose").Document<unknown, any, RegularHours> & Omit<RegularHours & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RegularHours, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RegularHours>> & Omit<import("mongoose").FlatRecord<RegularHours> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export declare class TempHours {
    date: Date;
    open: String;
    close: String;
}
declare class RecurringHoursInt {
    week: Number;
    day: Number;
    open: String;
    close: String;
}
export declare class CustomHours {
    tempHours: TempHours[];
    recurringHoursSingle: TempHours[];
    recurringHoursInt: RecurringHoursInt[];
}
export declare const CustomHoursSchema: import("mongoose").Schema<CustomHours, import("mongoose").Model<CustomHours, any, any, any, import("mongoose").Document<unknown, any, CustomHours> & Omit<CustomHours & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomHours, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CustomHours>> & Omit<import("mongoose").FlatRecord<CustomHours> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export {};
