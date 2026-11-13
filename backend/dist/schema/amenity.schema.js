"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAmenitySchema = exports.createAmenitySchema = void 0;
// schema/amenity.schema.ts
const zod_1 = require("zod");
exports.createAmenitySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    propertyId: zod_1.z.number().int().positive("Property ID is required"),
});
exports.updateAmenitySchema = exports.createAmenitySchema.partial();
