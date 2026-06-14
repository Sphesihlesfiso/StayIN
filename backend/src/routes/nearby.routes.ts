import { Router } from "express";
import {
  fetchAllNearbyPlaces,
  fetchNearbyPlaceById,
  postNearbyPlace,
  updateNearbyPlaceById,
  deleteNearbyPlaceById,
} from "../controller/nearby.controller";

// mergeParams allows this router to access :propertyId from the parent property.route.ts
const router = Router({ mergeParams: true });

// URL: GET /properties/:propertyId/nearby-places
router.get("/", fetchAllNearbyPlaces);

// URL: POST /properties/:propertyId/nearby-places
router.post("/", postNearbyPlace);

// URL: GET /properties/:propertyId/nearby-places/:placeId
router.get("/:placeId", fetchNearbyPlaceById);

// URL: PATCH /properties/:propertyId/nearby-places/:placeId
router.patch("/:placeId", updateNearbyPlaceById);

// URL: DELETE /properties/:propertyId/nearby-places/:placeId
router.delete("/:placeId", deleteNearbyPlaceById);

export default router;
