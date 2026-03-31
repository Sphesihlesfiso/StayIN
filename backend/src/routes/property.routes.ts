import { addProperty } from './../services/property.service';
import { Router } from "express";
import { getUniqueProperty } from "../controller/property.controller";
const router = Router();
router.get("/:id", getUniqueProperty);
router.post("/uploadproperty",addProperty)
export default router;
