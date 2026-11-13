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
exports.removeSavedPlace = void 0;
exports.getSavedPlaces = getSavedPlaces;
exports.savePlace = savePlace;
const db_1 = __importDefault(require("../config/db"));
const errors_1 = require("../errors/errors");
const selects_1 = require("../utils/selects");
const property_service_1 = require("./property.service");
function getSavedPlaces(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const saved = yield db_1.default.savedProperty.findMany({
            where: { userId, Property: { status: "PUBLISHED" } },
            include: { Property: { include: selects_1.propertyInclude } },
        });
        return saved.map((item) => (0, property_service_1.summary)(item.Property));
    });
}
function savePlace(userId, propertyId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield db_1.default.property.findFirst({
            where: { id: propertyId, status: "PUBLISHED" },
        })))
            throw new errors_1.AppError("Listing is unavailable.", 404);
        yield db_1.default.savedProperty.upsert({
            where: { userId_propertyId: { userId, propertyId } },
            create: { userId, propertyId },
            update: {},
        });
    });
}
const removeSavedPlace = (userId, propertyId) => db_1.default.savedProperty.deleteMany({ where: { userId, propertyId } });
exports.removeSavedPlace = removeSavedPlace;
