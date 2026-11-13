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
exports.updateAmenity = exports.deleteAmenity = exports.addAmenity = exports.getAmenityById = exports.getAllAmenities = void 0;
const db_1 = __importDefault(require("../config/db"));
const handlePrismaError_1 = require("../utils/handlePrismaError");
const errors_1 = require("../errors/errors");
const getAllAmenities = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.amenity.findMany({ where: { propertyId } });
});
exports.getAllAmenities = getAllAmenities;
const getAmenityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const amenity = yield db_1.default.amenity.findUnique({ where: { id } });
    if (!amenity)
        throw new errors_1.AppError("Amenity not found", 404);
    return amenity;
});
exports.getAmenityById = getAmenityById;
const addAmenity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.amenity.create({
            data: {
                name: data.name,
                Property: { connect: { id: data.propertyId } },
            },
        });
    }
    catch (error) {
        throw (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.addAmenity = addAmenity;
const deleteAmenity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.amenity.delete({ where: { id } });
    }
    catch (error) {
        throw (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.deleteAmenity = deleteAmenity;
const updateAmenity = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.amenity.update({
            where: { id },
            data,
        });
    }
    catch (error) {
        throw (0, handlePrismaError_1.handlePrismaError)(error);
    }
});
exports.updateAmenity = updateAmenity;
