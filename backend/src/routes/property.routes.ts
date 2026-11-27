
import { Router } from "express";
import { deleteProperty, fetchAllProperties, getAllpropertiesByLandlord, getUniqueProperty, updatePropertyById, uploadProperty } from "../controller/property.controller";
import { upload } from '../utils/imageUpload';
const router = Router();
router.get("/:id", getUniqueProperty);
router.get("/",fetchAllProperties)
router.get("/landlord/:id",getAllpropertiesByLandlord)
router.post("/",upload.array("images",5),uploadProperty)
router.delete("/:id",deleteProperty)
router.patch("/:id",upload.array("images",5),updatePropertyById)
export default router;
