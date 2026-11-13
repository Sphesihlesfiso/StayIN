"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyInclude = exports.safeUser = void 0;
// Shared projections prevent password hashes from entering API responses.
exports.safeUser = {
    id: true,
    username: true,
    email: true,
    role: true,
    createdAt: true,
};
exports.propertyInclude = {
    Amenities: true,
    rules: true,
    NearbyPlaces: true,
    User: { select: { id: true, username: true, createdAt: true } },
};
