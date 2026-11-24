
import { Router } from "express";
import { deleteProperty, fetchAllProperties, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
const router = Router();
router.get("/:id", getUniqueProperty);
router.get("/",fetchAllProperties)
router.post("/",uploadProperty)
router.delete("/:id",deleteProperty)
router.patch("/:id",updatePropertyById)
export default router;
