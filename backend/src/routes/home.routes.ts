import { Router, Request, Response } from "express";
import { fetchAllProperties } from "../controller/property.controller";

const router = Router();
router.get("/", fetchAllProperties);
router.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

export default router;
