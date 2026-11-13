"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReportSchema = void 0;
const zod_1 = require("zod");
const property_schema_1 = require("./property.schema");
exports.createReportSchema = zod_1.z.object({
    propertyId: property_schema_1.propertyIdSchema,
    reason: zod_1.z.enum([
        "Misleading information",
        "Suspected scam",
        "Duplicate listing",
        "Other",
    ]),
    details: zod_1.z.string().trim().min(10).max(2000),
});
