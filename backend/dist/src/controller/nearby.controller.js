"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNearbyPlaceById = exports.updateNearbyPlaceById = exports.postNearbyPlace = exports.fetchNearbyPlaceById = exports.fetchAllNearbyPlaces = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponce_1 = require("../utils/apiResponce");
const nearbyPlace_schema_1 = require("../../schema/nearbyPlace.schema");
const nearby_service_1 = require("../services/nearby.service");
// GET /properties/:propertyId/nearby-places
exports.fetchAllNearbyPlaces = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = Number(req.params.propertyId);
    const places = yield (0, nearby_service_1.getAllNearbyPlaces)(propertyId);
    res
        .status(200)
        .json((0, apiResponce_1.successResponse)(places, "Nearby places fetched successfully"));
}));
// GET /properties/:propertyId/nearby-places/:placeId
exports.fetchNearbyPlaceById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = Number(req.params.placeId);
    const place = yield (0, nearby_service_1.getNearbyPlaceById)(placeId);
    if (!place) {
        return res.status(404).json((0, apiResponce_1.errorResponse)("Nearby place not found"));
    }
    res
        .status(200)
        .json((0, apiResponce_1.successResponse)(place, "Nearby place fetched successfully"));
}));
// POST /properties/:propertyId/nearby-places
exports.postNearbyPlace = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Merge the body with the propertyId from the URL for Zod validation
    const inputData = Object.assign(Object.assign({}, req.body), { nearByPlaceId: Number(req.params.propertyId) });
    const parsed = nearbyPlace_schema_1.createNearbyPlaceSchema.safeParse(inputData);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    // Passing the validated data directly to the service
    const newPlace = yield (0, nearby_service_1.addNearbyPlace)(parsed.data);
    res
        .status(201)
        .json((0, apiResponce_1.successResponse)(newPlace, "Nearby place created successfully"));
}));
// PATCH /properties/:propertyId/nearby-places/:placeId
exports.updateNearbyPlaceById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = Number(req.params.placeId);
    const parsed = nearbyPlace_schema_1.updateNearbyPlaceSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    // Ensure there is actually data being sent to update
    if (Object.keys(parsed.data).length === 0) {
        return res
            .status(400)
            .json((0, apiResponce_1.errorResponse)("No valid fields provided for update"));
    }
    const updatedPlace = yield (0, nearby_service_1.updateNearbyPlace)(placeId, parsed.data);
    res
        .status(200)
        .json((0, apiResponce_1.successResponse)(updatedPlace, "Nearby place updated successfully"));
}));
// DELETE /properties/:propertyId/nearby-places/:placeId
exports.deleteNearbyPlaceById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = Number(req.params.placeId);
    yield (0, nearby_service_1.deleteNearbyPlace)(placeId);
    res
        .status(200)
        .json((0, apiResponce_1.successResponse)(null, "Nearby place deleted successfully"));
}));
