"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nearby_controller_1 = require("../controller/nearby.controller");
// mergeParams allows this router to access :propertyId from the parent property.route.ts
const router = (0, express_1.Router)({ mergeParams: true });
// URL: GET /properties/:propertyId/nearby-places
router.get("/", nearby_controller_1.fetchAllNearbyPlaces);
// URL: POST /properties/:propertyId/nearby-places
router.post("/", nearby_controller_1.postNearbyPlace);
// URL: GET /properties/:propertyId/nearby-places/:placeId
router.get("/:placeId", nearby_controller_1.fetchNearbyPlaceById);
// URL: PATCH /properties/:propertyId/nearby-places/:placeId
router.patch("/:placeId", nearby_controller_1.updateNearbyPlaceById);
// URL: DELETE /properties/:propertyId/nearby-places/:placeId
router.delete("/:placeId", nearby_controller_1.deleteNearbyPlaceById);
exports.default = router;
