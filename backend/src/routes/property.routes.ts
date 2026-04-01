import { addProperty } from './../services/property.service';
import { Router } from "express";
import { deleteProperty, getUniqueProperty, uploadProperty } from "../controller/property.controller";
const router = Router();
router.get("/:id", getUniqueProperty);
router.post("/uploadproperty",uploadProperty)
router.delete("/delete/:id",deleteProperty)
export default router;
