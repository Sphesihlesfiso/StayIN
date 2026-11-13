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
exports.updateAmenityById = exports.deleteAmenityById = exports.postAmenity = exports.fetchAmenityById = exports.fetchAllAmenities = void 0;
// controllers/amenity.controller.ts
const asyncHandler_1 = require("../utils/asyncHandler");
const amenity_service_1 = require("../services/amenity.service");
const apiResponce_1 = require("../utils/apiResponce");
const amenity_schema_1 = require("../../schema/amenity.schema");
exports.fetchAllAmenities = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = Number(req.params.propertyId);
    const amenities = yield (0, amenity_service_1.getAllAmenities)(propertyId);
    res.status(200).json((0, apiResponce_1.successResponse)(amenities, "Amenities fetched"));
}));
exports.fetchAmenityById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.amenityId);
    if (isNaN(id))
        return res.status(400).json((0, apiResponce_1.errorResponse)("Invalid id"));
    const amenity = yield (0, amenity_service_1.getAmenityById)(id);
    res.status(200).json((0, apiResponce_1.successResponse)(amenity, "Amenity found"));
}));
exports.postAmenity = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = amenity_schema_1.createAmenitySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    const amenity = yield (0, amenity_service_1.addAmenity)(parsed.data);
    res.status(201).json((0, apiResponce_1.successResponse)(amenity, "Amenity created"));
}));
exports.deleteAmenityById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.amenityId);
    if (isNaN(id))
        return res.status(400).json((0, apiResponce_1.errorResponse)("Invalid id"));
    yield (0, amenity_service_1.deleteAmenity)(id);
    res.status(204).send();
}));
exports.updateAmenityById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.amenityId);
    if (isNaN(id))
        return res.status(400).json((0, apiResponce_1.errorResponse)("Invalid id"));
    const parsed = amenity_schema_1.updateAmenitySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    const updatedAmenity = yield (0, amenity_service_1.updateAmenity)(id, parsed.data);
    res.status(200).json((0, apiResponce_1.successResponse)(updatedAmenity, "Amenity updated"));
}));
