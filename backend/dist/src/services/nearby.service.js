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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNearbyPlace = exports.deleteNearbyPlace = exports.addNearbyPlace = exports.getNearbyPlaceById = exports.getAllNearbyPlaces = void 0;
const db_1 = __importDefault(require("../config/db"));
const handlePrismaError_1 = require("../utils/handlePrismaError");
const errors_1 = require("../errors/errors");
const getAllNearbyPlaces = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.nearbyPlace.findMany({
            where: { nearByPlaceId: propertyId },
        });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.getAllNearbyPlaces = getAllNearbyPlaces;
const getNearbyPlaceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nearbyPlace = yield db_1.default.nearbyPlace.findUnique({ where: { id } });
    if (!nearbyPlace)
        throw new errors_1.AppError("Nearby place not found", 404);
    return nearbyPlace;
});
exports.getNearbyPlaceById = getNearbyPlaceById;
const addNearbyPlace = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.nearbyPlace.create({
            data: {
                name: data.name,
                type: data.type,
                distance: data.distance,
                Property: { connect: { id: data.nearByPlaceId } },
            },
        });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.addNearbyPlace = addNearbyPlace;
const deleteNearbyPlace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.nearbyPlace.delete({ where: { id } });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.deleteNearbyPlace = deleteNearbyPlace;
const updateNearbyPlace = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.nearbyPlace.update({
            where: { id },
            data,
        });
    }
    catch (error) {
        (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.updateNearbyPlace = updateNearbyPlace;
