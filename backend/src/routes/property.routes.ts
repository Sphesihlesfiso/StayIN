import { addProperty } from './../services/property.service';
import { Router } from "express";
import { deleteProperty, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
import amenityRouter from "./amenity.routes"
import ruleRouter from "./rule.routes"
const router = Router();
router.get("/:propertyId", getUniqueProperty);
router.post("/",uploadProperty)
router.delete("/:propertyId", deleteProperty);
router.patch("/:propertyId", updatePropertyById);
router.use("/:propertyId/amenities", amenityRouter);
router.use("/:propertyId/rules",ruleRouter)
export default router;
