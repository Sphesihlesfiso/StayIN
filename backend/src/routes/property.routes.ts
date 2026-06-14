import { addProperty } from './../services/property.service';
import { Router } from "express";
import { deleteProperty, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
import amenityRouter from "./amenity.routes"
import ruleRouter from "./rule.routes"
import nearbyPlaceRouter from "./nearby.routes"
import commentRouter from "./comment.routes"
const router = Router();

router.get("/:propertyId", getUniqueProperty);
router.post("/",uploadProperty)
router.delete("/:propertyId", deleteProperty);
router.patch("/:propertyId", updatePropertyById);
router.use("/:propertyId/amenities", amenityRouter);
router.use("/:propertyId/rules",ruleRouter)
router.use("/:propertyId/comments", commentRouter);
router.use("/:propertyId/nearby-places",nearbyPlaceRouter)
export default router;
