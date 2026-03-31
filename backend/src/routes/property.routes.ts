import { Router } from "express";
import { getUniqueProperty } from "../controller/property.controller";
const router = Router();
router.get("/:id", getUniqueProperty);
export default router;
