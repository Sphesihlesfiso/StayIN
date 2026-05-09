import { addProperty } from './../services/property.service';
import { Router } from "express";
import { deleteProperty, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
const router = Router();
router.get("/:id", getUniqueProperty);
router.post("/",uploadProperty)
router.delete("/:id",deleteProperty)
router.patch("/:id",updatePropertyById)
export default router;
