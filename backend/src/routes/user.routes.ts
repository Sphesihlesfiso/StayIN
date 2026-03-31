import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import { Router } from "express";
import { insertUser } from "../controller/user.controller";
const router =Router();
router.post("/sign-up",insertUser)
export default router;