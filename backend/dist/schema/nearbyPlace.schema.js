"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNearbyPlaceSchema = exports.createNearbyPlaceSchema = void 0;
const zod_1 = require("zod");
exports.createNearbyPlaceSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    type: zod_1.z.string().min(1, "Type is required"),
    distance: zod_1.z.number().positive("Distance must be a positive number"),
    nearByPlaceId: zod_1.z.number().int().positive("Property ID is required"),
});
exports.updateNearbyPlaceSchema = exports.createNearbyPlaceSchema.partial();
