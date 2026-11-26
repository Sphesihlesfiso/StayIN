
import { Router } from "express";
import { deleteProperty, fetchAllProperties, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
import { upload } from '../utils/imageUpload';
const router = Router();
router.get("/:id", getUniqueProperty);
router.get("/",fetchAllProperties)
router.post("/",upload.array("images",5),uploadProperty)
router.delete("/:id",deleteProperty)
router.patch("/:id",updatePropertyById)
export default router;
