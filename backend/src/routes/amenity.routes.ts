import { Router } from "express";
import { deleteAmenityById, fetchAllAmenities, postAmenity, updateAmenityById } from "../controller/amenity.controller";

const router=Router({mergeParams:true})
router.get("/",fetchAllAmenities)
router.post("/",postAmenity)
router.patch("/:amenityId",updateAmenityById)
router.delete("/:amenityId",deleteAmenityById)
export default router