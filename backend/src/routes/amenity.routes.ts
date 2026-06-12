import { Router } from "express";
import { getAllAmenities } from "../services/amenity.service";
import prisma from "../config/db";
const router=Router()
router.get("/:id",getAllAmenities)
router.get("/prisma-test", async (_, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
export default router