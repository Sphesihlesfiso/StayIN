import { Router } from "express";
import { fetchAllAmenities } from "../controller/amenity.controller";

const router=Router()
router.get("/:id",fetchAllAmenities)

export default router