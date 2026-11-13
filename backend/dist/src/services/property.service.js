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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summary = summary;
exports.getAllProperties = getAllProperties;
exports.getPropertyById = getPropertyById;
exports.getLandlordProperties = getLandlordProperties;
exports.addProperty = addProperty;
exports.updateProperty = updateProperty;
exports.deletePropertyById = deletePropertyById;
exports.getListingLocations = getListingLocations;
const client_1 = require("@prisma/client");
const db_1 = __importDefault(require("../config/db"));
const errors_1 = require("../errors/errors");
const selects_1 = require("../utils/selects");
const property_schema_1 = require("../../schema/property.schema");
/** Search and saved-place cards need one small cover image, not every full-size photo. */
function summary(property) {
    const first = Array.isArray(property.photos) ? property.photos[0] : null;
    const cover = first && typeof first === "object" && !Array.isArray(first)
        ? [{ src: first.thumbnail || first.src, alt: first.alt }]
        : [];
    return Object.assign(Object.assign({}, property), { photos: cover });
}
function getAllProperties(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Normalize older manually entered locations without rewriting a landlord's listing.
        const locations = query.town || query.suburb
            ? yield db_1.default.$queryRaw(client_1.Prisma.sql `
    SELECT "id" FROM "Property" WHERE "status" = 'PUBLISHED'
    ${query.town ? client_1.Prisma.sql `AND lower(regexp_replace(trim("town"), '[[:space:]]+', ' ', 'g')) = ${normalizeLocation(query.town)}` : client_1.Prisma.empty}
    ${query.suburb ? client_1.Prisma.sql `AND lower(regexp_replace(trim("suburb"), '[[:space:]]+', ' ', 'g')) IN (${client_1.Prisma.join(suburbAliases(query.suburb).map(normalizeLocation))})` : client_1.Prisma.empty}
  `)
            : null;
        const where = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ status: "PUBLISHED" }, (locations ? { id: { in: locations.map((v) => v.id) } } : {})), (query.nsfasAccredited !== undefined
            ? { nsfasAccredited: query.nsfasAccredited }
            : {})), (query.rentBasis ? { rentBasis: query.rentBasis } : {})), (query.furnishing ? { furnishing: query.furnishing } : {})), (query.bathroom ? { bathroom: query.bathroom } : {})), (query.wifiIncluded !== undefined
            ? { wifiIncluded: query.wifiIncluded }
            : {})), (query.moveInBy
            ? {
                AND: [
                    {
                        OR: [
                            { availability: "NOW" },
                            {
                                availability: "FROM_DATE",
                                availableFrom: {
                                    lte: new Date(`${query.moveInBy}T00:00:00.000Z`),
                                },
                            },
                        ],
                    },
                ],
            }
            : {})), (query.type ? { propertyType: query.type } : {})), (query.maxRent ? { rent: { lte: query.maxRent } } : {})), (query.q
            ? {
                OR: ["name", "town", "suburb"].map((key) => ({
                    [key]: { contains: query.q, mode: "insensitive" },
                })),
            }
            : {}));
        const [items, total] = yield db_1.default.$transaction([
            db_1.default.property.findMany({
                where,
                include: selects_1.propertyInclude,
                take: 12,
                skip: (query.page - 1) * 12,
                orderBy: { createdAt: "desc" },
            }),
            db_1.default.property.count({ where }),
        ]);
        return { items: items.map(summary), total, page: query.page };
    });
}
function getPropertyById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield db_1.default.property.findUnique({ where: { id }, include: selects_1.propertyInclude });
        if (!property ||
            (property.status !== "PUBLISHED" && property.landlordId !== userId))
            throw new errors_1.AppError("Listing not found or no longer available.", 404);
        return property;
    });
}
function getLandlordProperties(userId) {
    return db_1.default.property.findMany({
        where: { landlordId: userId },
        include: selects_1.propertyInclude,
        orderBy: { updatedAt: "desc" },
    });
}
function checkOwner(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield db_1.default.property.findUnique({
            where: { id },
        });
        if (!property || property.landlordId !== userId)
            throw new errors_1.AppError("Listing not found.", 404);
        return property;
    });
}
function addProperty(userId, input) {
    const { amenities, rules, photos, nearbyPlaces, availableFrom } = input, data = __rest(input, ["amenities", "rules", "photos", "nearbyPlaces", "availableFrom"]);
    return db_1.default.property.create({
        data: Object.assign(Object.assign({}, data), { availableFrom: availableFrom
                ? new Date(`${availableFrom}T00:00:00.000Z`)
                : availableFrom, photos, landlordId: userId, NearbyPlaces: { create: nearbyPlaces || [] }, Amenities: { create: amenities.map((name) => ({ name })) }, rules: { create: rules.map((content) => ({ content })) } }),
        include: selects_1.propertyInclude,
    });
}
function updateProperty(id, userId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const existing = yield checkOwner(id, userId);
        // Validate the merged details so older clients cannot erase metadata or create
        // contradictory included charges by omitting newly introduced fields.
        const merged = property_schema_1.createPropertySchema.parse(Object.assign(Object.assign(Object.assign(Object.assign({}, existing), { availableFrom: (_b = (_a = existing.availableFrom) === null || _a === void 0 ? void 0 : _a.toISOString().slice(0, 10)) !== null && _b !== void 0 ? _b : null }), input), (input.availability !== undefined && input.availability !== "FROM_DATE"
            ? { availableFrom: null }
            : {})));
        const { amenities, rules, photos, nearbyPlaces, availableFrom } = merged, data = __rest(merged, ["amenities", "rules", "photos", "nearbyPlaces", "availableFrom"]);
        return db_1.default.property.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, data), { availableFrom: availableFrom
                    ? new Date(`${availableFrom}T00:00:00.000Z`)
                    : availableFrom, photos }), (nearbyPlaces !== undefined
                ? { NearbyPlaces: { deleteMany: {}, create: nearbyPlaces } }
                : {})), { Amenities: {
                    deleteMany: {},
                    create: amenities.map((name) => ({ name })),
                }, rules: { deleteMany: {}, create: rules.map((content) => ({ content })) } }),
            include: selects_1.propertyInclude,
        });
    });
}
function deletePropertyById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkOwner(id, userId);
        // Legacy related records must be removed in the same transaction as their listing.
        yield db_1.default.$transaction([
            db_1.default.comment.deleteMany({ where: { propertyId: id } }),
            db_1.default.amenity.deleteMany({ where: { propertyId: id } }),
            db_1.default.rule.deleteMany({ where: { propertyId: id } }),
            db_1.default.nearbyPlace.deleteMany({ where: { nearByPlaceId: id } }),
            db_1.default.property.delete({ where: { id } }),
        ]);
    });
}
/** Include published locations only: a draft address must never leak through suggestions. */
function getListingLocations() {
    return db_1.default.property.findMany({
        where: { status: "PUBLISHED" },
        select: { town: true, suburb: true },
        distinct: ["town", "suburb"],
        orderBy: [{ town: "asc" }, { suburb: "asc" }],
    });
}
// Common English/Afrikaans spellings refer to the same neighbourhood.
function suburbAliases(value) {
    const aliases = [
        "Idas Valley",
        "Idas vallei",
        "Idasvallei",
        "Ida's Valley",
        "Ida’s Valley",
    ];
    return aliases.some((v) => normalizeLocation(v) === normalizeLocation(value))
        ? aliases
        : [value];
}
function normalizeLocation(value) {
    return value.trim().replace(/\s+/g, " ").toLowerCase();
}
