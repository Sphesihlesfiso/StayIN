import { Router, Request, Response } from "express";
import { fetchAllProperties } from "../controller/property.controller";

const router = Router();
router.get("/", fetchAllProperties);

export default router;
